import React from 'react'
import { AuthProvider } from '../contexts'
import { SignInForm } from '../components'

export const SignInPage = () => (
	<AuthProvider>
		<SignInForm />
	</AuthProvider>
)
