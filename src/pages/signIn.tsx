import React from 'react'
import { UserType } from '../types'
import { AuthProvider } from '../contexts'
import { SignInForm } from '../components'

export const SignInPage = ({ user }: { user: UserType }) => (
	<AuthProvider user={user}>
		<SignInForm />
	</AuthProvider>
)

export default SignInPage
