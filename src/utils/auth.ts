import { UserType } from '../types'

export const NEEDS_NEW_PASSWORD_CHALLENGE_NAME = 'NEW_PASSWORD_REQUIRED'

export const extractUserInformationFromAmplifySignIn = (user: any): UserType => {
	const {
		attributes,
		challengeName,
		challengeParam,
		signInUserSession,
		username,
	} = user
	const needsNewPassword: boolean = challengeName === NEEDS_NEW_PASSWORD_CHALLENGE_NAME
	const hasRequiredFieldsToComplete: boolean = challengeParam?.requiredAttributes?.length > 0
	const isValid: boolean = !needsNewPassword || !hasRequiredFieldsToComplete

	return {
		fullName: isValid ? `${attributes?.given_name} ${attributes?.family_name}` : '',
		isValid,
		jwtToken: signInUserSession?.idToken?.jwtToken,
		needsNewPassword,
		requiredAttributes: challengeParam?.requiredAttributes ?? [],
		userName: username,
	}
}

export const getAuthenticationSession = async (AWSAmplifyAuth: any): Promise<UserType | null> => {
	let user: UserType | null = null

	await AWSAmplifyAuth.currentAuthenticatedUser().then((cognitoUser: any) => {
		user = extractUserInformationFromAmplifySignIn(cognitoUser)
	}).catch(() => {
		user = null
	})
	
	return user
}

export const isUserAuthenticated = (user: UserType | null): boolean => {
	if(user === null) {
		return false
	}
	
	return user?.isValid
}
