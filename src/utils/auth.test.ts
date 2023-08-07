import Chance from 'chance'
import { extractUserInformationFromAmplifySignIn, NEEDS_NEW_PASSWORD_CHALLENGE_NAME } from './auth'
import { REQUIRED_USER_FIELDS } from '../types'

describe('Auth Utils', () => {
	const chance = new Chance()

	it('should extract a user object that needs a new password and required fields', () => {
		const username = chance.name()
		const cognitoLikeUser: any = {
			challengeName: NEEDS_NEW_PASSWORD_CHALLENGE_NAME,
			challengeParam: {
				requiredAttributes: Object.values(REQUIRED_USER_FIELDS),
			},
			username,
		}

		expect(extractUserInformationFromAmplifySignIn(cognitoLikeUser)).toStrictEqual({
			fullName: ``,
			isValid: false,
			jwtToken: undefined,
			needsNewPassword: true,
			requiredAttributes: Object.values(REQUIRED_USER_FIELDS),
			userName: username,
		})
	})

	it('should extract a user object that is valid', () => {
		const username: string = chance.name()
		const firstName: string = chance.first()
		const lastName: string = chance.last()
		const jwtToken: string = chance.guid()
		const cognitoLikeUser: any = {
			attributes: {
				given_name: firstName,
				family_name: lastName,
			},
			challengeName: 'NO_CHALLENGE',
			challengeParam: {
				requiredAttributes: [],
			},
			signInUserSession: {
				idToken: {
					jwtToken,
				},
			},
			username,
		}

		expect(extractUserInformationFromAmplifySignIn(cognitoLikeUser)).toStrictEqual({
			fullName: `${firstName} ${lastName}`,
			isValid: true,
			jwtToken,
			needsNewPassword: false,
			requiredAttributes: [],
			userName: username,
		})
	})
})
