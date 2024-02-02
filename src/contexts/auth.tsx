import React, { createContext, useContext, ReactElement } from 'react'
import {
	confirmSignIn,
	confirmResetPassword,
	resetPassword,
	signIn,
	type ConfirmResetPasswordInput,
	type ResetPasswordOutput,
	type SignInInput,
	type SignInOutput,
} from 'aws-amplify/auth'
import {
	type AuthContextType,
	type AttemptToCompleteNewUser,
	type AttemptToSignIn,
	type User,
} from '../types'

export const AuthContext = createContext<AuthContextType>({
	attemptToCompleteNewUser: /* istanbul ignore next */ () => new Promise((_, reject) => reject('Auth Context not initiated')),
	attemptToResetPassword: /* istanbul ignore next */ () => new Promise((_, reject) => reject('Auth Context not initiated')),
	attemptToGetResetPasswordCode: /* istanbul ignore next */ () => new Promise((_, reject) => reject('Auth Context not initiated')),
	attemptToSignIn: /* istanbul ignore next */ () => new Promise((_, reject) => reject('Auth Context not initiated')),
	user: null,
})

type PropsType = {
	user: User | null,
    children: ReactElement,
}

export const DEFAULT_ERROR_MESSAGE: string = 'Something went wrong.'
const USER_COMPLETE_STEP: string = 'DONE'
const USER_NOT_COMPLETED_STEPS: string[] = ['CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED']

export const AuthProvider: React.FC<PropsType> = ({ user, children }) => {
	const attemptToSignIn: AttemptToSignIn = async({ username, password }: SignInInput) => {
		let isUserComplete: boolean = false
		let isError: boolean = false
		let errorMessage: string = DEFAULT_ERROR_MESSAGE

		try {
			const { isSignedIn, nextStep }: SignInOutput = await signIn({ username, password })
			const { signInStep } = nextStep
			const isUserRequiredToComplete: boolean = USER_NOT_COMPLETED_STEPS.includes(signInStep)

			isUserComplete = signInStep === USER_COMPLETE_STEP

			const isStepUnaccountedFor: boolean = !isUserComplete && !isUserRequiredToComplete

			isError = !isSignedIn && !isUserRequiredToComplete

			if (isStepUnaccountedFor) {
				errorMessage = `UI flow is missing a step: ${signInStep}. This is not your fault; please contact support.`
			}
		} catch (error) {
			isError = true
			errorMessage = String(error)
		}

		if (isError) {
			// alert is only because there is no ui error handling in place yet
			alert(errorMessage)
			throw new Error(errorMessage)
		}

		return { isUserComplete }
	}

	const attemptToCompleteNewUser: AttemptToCompleteNewUser = async(password, userAttributes) => {
		let isError: boolean = false
		let errorMessage: string = DEFAULT_ERROR_MESSAGE

		try {
			const { isSignedIn, nextStep }:SignInOutput = await confirmSignIn({
				challengeResponse: password,
				options: {
					userAttributes,
				},
			})
			const { signInStep } = nextStep
			const isUserComplete = signInStep === USER_COMPLETE_STEP

			isError = !isSignedIn || !isUserComplete
		} catch (error) {
			isError = true
			errorMessage = String(error)
		}

		if (isError) {
			// alert is only because there is no ui error handling in place yet
			alert(errorMessage)
			throw new Error(errorMessage)
		}
	}

	const attemptToGetResetPasswordCode = async(username: string) => {
		let isPasswordResetCodeSent: boolean = false
		let isError: boolean = false
		let errorMessage: string = DEFAULT_ERROR_MESSAGE

		try {
			const { nextStep }: ResetPasswordOutput = await resetPassword({ username })
			const { resetPasswordStep } = nextStep

			if (resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
				isPasswordResetCodeSent = true
			} else {
				isError = true
				errorMessage = `UI flow is missing a step: ${resetPasswordStep}. This is not your fault; please contact support.`
			}

		} catch (error) {
			if (error instanceof Error) {
				errorMessage = error.message
			}

			isError = true
		}

		if (isError) {
			// alert is only because there is no ui error handling in place yet
			alert(errorMessage)
			throw new Error(errorMessage)
		}

		return { isPasswordResetCodeSent }
	}

	const attemptToResetPassword = async(resetPasswordInput: ConfirmResetPasswordInput) => {
		let isError: boolean = false
		let errorMessage: string = DEFAULT_ERROR_MESSAGE

		try {
			await confirmResetPassword(resetPasswordInput)
		} catch (error) {
			if (error instanceof Error) {
				errorMessage = error.message
			}

			isError = true
		}

		if (isError) {
			// alert is only because there is no ui error handling in place yet
			alert(errorMessage)
			throw new Error(errorMessage)
		}
	}

	return (
		<AuthContext.Provider value={{
			attemptToCompleteNewUser,
			attemptToGetResetPasswordCode,
			attemptToResetPassword,
			attemptToSignIn,
			user,
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = (): AuthContextType => useContext(AuthContext)
