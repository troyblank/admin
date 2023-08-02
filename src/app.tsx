import React from 'react'
import { Router } from './router'
import { AuthProvider } from './contexts'

export const App = () => {
	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	)
}
