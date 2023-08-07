import React, { createContext, useContext, useEffect, useState, ReactElement } from 'react'
import { Amplify, Auth } from 'aws-amplify'
import {
	AuthContextType,
	AttemptToCompleteNewUserType,
	AttemptToSignInType,
	UserType,
} from '../types'
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
	attemptToCompleteNewUser: /* istanbul ignore next */ () => new Promise((_, reject) => reject('Auth Context not initiated')),
})

type PropsType = {
    children: ReactElement,
}

export const AuthProvider: React.FC<PropsType> = ({ children }) => {
	const [cognitoUser, setCognitoUser] = useState<any | undefined>()
	const [user, setUser] = useState<UserType | undefined>()
	
	useEffect(() => {	
		getCognitoUser().then((cognitoUser) => {
			if (cognitoUser) {
				setUser(extractUserInformationFromAmplifySignIn(cognitoUser))
			}
		})
	}, [])

	const getCognitoUser = async (): Promise<any> => {
		/* istanbul ignore next */
		if (cognitoUser) {
			return cognitoUser
		}

		return await Auth.currentAuthenticatedUser()
	}

	const attemptToSignIn: AttemptToSignInType = async(userName, password) => {
		let extractedUser: UserType | undefined

		try {
			const cognitoUser: any = await Auth.signIn(userName, password)
			extractedUser = extractUserInformationFromAmplifySignIn(cognitoUser)

			setCognitoUser(cognitoUser)
			setUser(extractedUser)
		} catch (error) {
			alert(error)
		}

		return extractedUser
	}

	
	const attemptToCompleteNewUser: AttemptToCompleteNewUserType = async (password, attributes) => {
		let extractedUser: UserType | undefined

		try {
			const cognitoUser: any = await getCognitoUser()
			const authorizedCognitoUser: any = await Auth.completeNewPassword(cognitoUser, password, attributes)
			extractedUser = extractUserInformationFromAmplifySignIn(authorizedCognitoUser)

			setCognitoUser(authorizedCognitoUser)
			setUser(extractedUser)
		} catch(error) {
			alert(error)
		}
	}

	return (
		<AuthContext.Provider value={{attemptToCompleteNewUser, attemptToSignIn, user}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = (): AuthContextType => useContext(AuthContext)
