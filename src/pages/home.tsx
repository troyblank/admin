import React from 'react'
import { AuthProvider } from '../contexts'

export const HomePage = () => (
	<AuthProvider>
		<div>This is the home page, go to <a href={'/signin'}>here to sign in</a></div>
	</AuthProvider>
)
