import React from 'react'
import { useAuth } from '../../contexts'

export const ProfileGreeting = () => {
	const { user } = useAuth()

	if (user) {
		return (
			<>
				<h1>Hello, {user?.fullName}</h1>
			</>
		)
	}

	return null
}
