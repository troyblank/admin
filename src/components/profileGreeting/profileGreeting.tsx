import React from 'react'
import { useAuth } from '../../contexts'

export const ProfileGreeting = () => {
	const { user } = useAuth()

	if (user) {
		return (
			<h1>Hello, {user?.userName}</h1>
		)
	}

	return null
}
