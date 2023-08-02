import { extractUserInformationFromAmplifySignIn, NEEDS_NEW_PASSWORD_CHALLENGE_NAME } from './auth'
import { REQUIRED_USER_FIELDS } from '../types'


describe('Auth Utils', () => {

	it('should extract a user object that needs a new password and required fields', () => {
		const cognitoLikeUser: any = {
			challengeName: NEEDS_NEW_PASSWORD_CHALLENGE_NAME,
			challengeParam: {
				requiredAttributes: Object.values(REQUIRED_USER_FIELDS),
			},
		}

		expect(extractUserInformationFromAmplifySignIn(cognitoLikeUser)).toStrictEqual({
			isValid: false,
			needsNewPassword: true,
			requiredAttributes: Object.values(REQUIRED_USER_FIELDS),
		})
	})

	it('should extract a user object that is valid', () => {
		const cognitoLikeUser: any = {
			challengeName: 'NO_CHALLENGE',
			challengeParam: {
				requiredAttributes: [],
			},
		}

		expect(extractUserInformationFromAmplifySignIn(cognitoLikeUser)).toStrictEqual({
			isValid: true,
			needsNewPassword: false,
			requiredAttributes: [],
		})
	})
})
