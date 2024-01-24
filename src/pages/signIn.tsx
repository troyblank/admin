import React from 'react'
import { type User } from '../types'
import { AuthProvider } from '../contexts'
import { SignInForm } from '../components'

export const SignInPage = ({ user }: { user: User }) => (
	<AuthProvider user={user}>
		<SignInForm />
	</AuthProvider>
)

export default SignInPage
