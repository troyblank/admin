import { Auth } from '@aws-amplify/auth'
import { CognitoUserType, CognitoUserSessionType, UserType } from '../types'

export const NEEDS_NEW_PASSWORD_CHALLENGE_NAME = 'NEW_PASSWORD_REQUIRED'

export const extractUserInformationFromCognito = (user: CognitoUserType, refreshedAccessToken?: string): UserType => {
	const {
		attributes,
		challengeName,
		challengeParam,
		signInUserSession,
		username,
	} = user
	const needsNewPassword: boolean = challengeName === NEEDS_NEW_PASSWORD_CHALLENGE_NAME
	const hasRequiredFieldsToComplete: boolean = challengeParam?.requiredAttributes ? challengeParam.requiredAttributes.length > 0 : false
	const isValid: boolean = !needsNewPassword || !hasRequiredFieldsToComplete

	return {
		fullName: isValid ? `${attributes?.given_name} ${attributes?.family_name}` : '',
		isValid,
		jwtToken: refreshedAccessToken ? refreshedAccessToken : signInUserSession?.idToken?.jwtToken,
		needsNewPassword,
		requiredAttributes: challengeParam?.requiredAttributes ?? [],
		userName: username,
	}
}

export const getRefreshedAuthenticationSession = async (AWSAmplifyAuth: typeof Auth): Promise<UserType | null> => {
	let user: UserType | null = null

	try {
		const cognitoUser: CognitoUserType = await AWSAmplifyAuth.currentAuthenticatedUser()
		// currentSession takes care of refreshing the token if it is expired.
		const { accessToken }: CognitoUserSessionType = await AWSAmplifyAuth.currentSession() as unknown as CognitoUserSessionType

		user = extractUserInformationFromCognito(cognitoUser, accessToken.jwtToken)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('User not authenticated.', error)
		user = null
	}

	return user
}

export const isUserAuthenticated = (user: UserType | null): boolean => {
	if(user === null) {
		return false
	}

	return user?.isValid
}
