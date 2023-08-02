import React, { createContext, useContext, ReactElement } from 'react'
import { Amplify, Auth } from 'aws-amplify'
import { AuthContextType, AttemptToSignInType } from '../types'
import { extractUserInformationFromAmplifySignIn } from '../utils'

Amplify.configure({
	Auth: {
		region: 'us-west-2',
		userPoolId: 'us-west-2_2MIJDuwNb',
		userPoolWebClientId: 'vhhhksehmohvv090pmvuok8i1',
		authenticationFlowType: 'USER_PASSWORD_AUTH',
	},
})

export const AuthContext = createContext<AuthContextType>({
	attemptToSignIn: /* istanbul ignore next */ () => new Promise((_, reject) => reject('Auth Context not initiated')),
})

type PropsType = {
    children: ReactElement,
}

export const AuthProvider: React.FC<PropsType> = ({ children }) => {
	const attemptToSignIn: AttemptToSignInType = (userName, password) => new Promise((resolve) => {
		Auth.signIn(userName, password).then(
			/* istanbul ignore next */
			(user) => resolve(extractUserInformationFromAmplifySignIn(user)),
		)
	})

	return (
		<AuthContext.Provider value={{attemptToSignIn}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = (): AuthContextType => useContext(AuthContext)
