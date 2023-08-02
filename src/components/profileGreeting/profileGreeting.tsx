import React from 'react'
import { useAuth } from '../../contexts'

export const ProfileGreeting = () => {
	const { user } = useAuth()

	return (
		<h1>Hello, {user?.userName}</h1>
	)
}
