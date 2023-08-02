import { UserType } from '../types'

export const NEEDS_NEW_PASSWORD_CHALLENGE_NAME = 'NEW_PASSWORD_REQUIRED'

export const extractUserInformationFromAmplifySignIn = (user: any): UserType => {
	const { challengeName, challengeParam, username } = user
	const needsNewPassword: boolean = challengeName === NEEDS_NEW_PASSWORD_CHALLENGE_NAME
	const hasRequiredFieldsToComplete: boolean = challengeParam?.requiredAttributes.length > 0

	return {
		isValid: !needsNewPassword || !hasRequiredFieldsToComplete,
		needsNewPassword,
		requiredAttributes: challengeParam?.requiredAttributes,
		userName: username,
	}
}
