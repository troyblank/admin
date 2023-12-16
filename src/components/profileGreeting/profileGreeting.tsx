import React, { Fragment } from 'react'
import { useAuth } from '../../contexts'

export const ProfileGreeting = () => {
	const { user } = useAuth()

	if (user) {
		return (
			<Fragment>
				<h1>Hello, {user?.fullName}</h1>
			</Fragment>
		)
	}

	return null
}
