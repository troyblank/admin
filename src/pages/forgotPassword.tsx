import React from 'react'
import { AuthProvider } from '../contexts'
import { ForgotPasswordForm } from '../components'

export const ForgotPasswordPage = () => (
	<AuthProvider user={null}>
		<ForgotPasswordForm />
	</AuthProvider>
)

export default ForgotPasswordPage
