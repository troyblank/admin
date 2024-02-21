import Chance from 'chance'
import {
	fetchAuthSession,
	fetchUserAttributes,
	getCurrentUser,
} from 'aws-amplify/auth/server'
import { type User } from '../types'
import { mockUser } from '../mocks'
import { extractUserInformationFromAmplifyServerContext } from './auth'

jest.mock('aws-amplify/auth/server')

describe('Auth Utils', () => {
	const chance = new Chance()

	it('should be able to extract user information from the amplify server context', async () => {
		const firstName: string = chance.first()
		const lastName: string = chance.last()
		const jwtToken: string = chance.guid()
		const username: string = chance.first()
		const expectedUser: User = mockUser({
			fullName: `${firstName} ${lastName}`,
			jwtToken,
			username,
		})

		jest.mocked(getCurrentUser).mockResolvedValue({ username } as any)
		jest.mocked(fetchAuthSession).mockResolvedValue({ tokens: { idToken: jwtToken } } as any)
		jest.mocked(fetchUserAttributes).mockResolvedValue({ given_name: firstName, family_name: lastName } as any)

		expect(await extractUserInformationFromAmplifyServerContext({} as any)).toStrictEqual(expectedUser)
	})
})
