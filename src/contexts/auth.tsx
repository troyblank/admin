import React, { createContext, useContext, ReactElement } from 'react'
import {
	confirmSignIn,
	signIn,
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
	attemptToSignIn: /* istanbul ignore next */ () => new Promise((_, reject) => reject('Auth Context not initiated')),
	attemptToCompleteNewUser: /* istanbul ignore next */ () => new Promise((_, reject) => reject('Auth Context not initiated')),
	user: null,
})

type PropsType = {
	user: User | null,
    children: ReactElement,
}

const USER_COMPLETE_STEP: string = 'DONE'
const USER_NOT_COMPLETED_STEPS: string[] = ['CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED']
const DEFAULT_ERROR_MESSAGE: string = 'Something went wrong.'

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

	return (
		<AuthContext.Provider value={{attemptToCompleteNewUser, attemptToSignIn, user}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = (): AuthContextType => useContext(AuthContext)
