import React, { createContext, useContext, useState, ReactElement } from 'react'
import { Auth } from 'aws-amplify'
import {
	AuthContextType,
	AttemptToCompleteNewUserType,
	AttemptToSignInType,
	CognitoUserType,
	UserType,
} from '../types'
import { extractUserInformationFromCognito } from '../utils'

export const AuthContext = createContext<AuthContextType>({
	attemptToSignIn: /* istanbul ignore next */ () => new Promise((_, reject) => reject('Auth Context not initiated')),
	attemptToCompleteNewUser: /* istanbul ignore next */ () => new Promise((_, reject) => reject('Auth Context not initiated')),
	user: null,
})

type PropsType = {
	user: UserType | null,
    children: ReactElement,
}

export const AuthProvider: React.FC<PropsType> = ({ user: userToSet, children }) => {
	const [cognitoUser, setCognitoUser] = useState<CognitoUserType | undefined>()
	const [user, setUser] = useState<UserType | null>(userToSet)

	const getCognitoUser = async (): Promise<CognitoUserType> => {
		/* istanbul ignore next */
		if (cognitoUser) {
			return cognitoUser
		}

		return await Auth.currentAuthenticatedUser()
	}

	const attemptToSignIn: AttemptToSignInType = async(userName, password) => {
		let extractedUser: UserType | null = null

		try {
			const cognitoUser: CognitoUserType = await Auth.signIn(userName, password)
			extractedUser = extractUserInformationFromCognito(cognitoUser)

			setCognitoUser(cognitoUser)
			setUser(extractedUser)
		} catch (error) {
			// alert is only because there is no ui error handling in place yet
			alert(error)
			throw new Error(String(error))
		}

		return extractedUser
	}

	const attemptToCompleteNewUser: AttemptToCompleteNewUserType = async (password, attributes) => {
		let extractedUser: UserType | undefined

		try {
			const cognitoUser: CognitoUserType = await getCognitoUser()
			const authorizedCognitoUser: CognitoUserType = await Auth.completeNewPassword(cognitoUser, password, attributes)
			extractedUser = extractUserInformationFromCognito(authorizedCognitoUser)

			setCognitoUser(authorizedCognitoUser)
			setUser(extractedUser)
		} catch(error) {
			// alert is only because there is no ui error handling in place yet
			alert(error)
			throw new Error(String(error))
		}
	}

	return (
		<AuthContext.Provider value={{attemptToCompleteNewUser, attemptToSignIn, user}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = (): AuthContextType => useContext(AuthContext)
