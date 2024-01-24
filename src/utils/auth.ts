import { type AmplifyServer } from 'aws-amplify/adapter-core'
import { type FetchUserAttributesOutput, type GetCurrentUserOutput } from '@aws-amplify/auth'
import {
	fetchAuthSession,
	fetchUserAttributes,
	getCurrentUser,
} from 'aws-amplify/auth/server'
import {
	type AuthSession,
	type User,
} from '../types'

export const extractUserInformationFromAmplifyServerContext = async(amplifyContextSpecification: AmplifyServer.ContextSpec): Promise<User> => {
	const { username }: GetCurrentUserOutput = await getCurrentUser(amplifyContextSpecification)
	const { tokens }: AuthSession = await fetchAuthSession(amplifyContextSpecification)
	const attributes: FetchUserAttributesOutput = await fetchUserAttributes(amplifyContextSpecification)
	const jwtToken: string = String(tokens?.accessToken.toString())

	return {
		fullName: `${attributes?.given_name} ${attributes?.family_name}`,
		jwtToken,
		username: username,
	}
}
