import React from 'react'
import { useAuth } from '../../contexts'
import { NEEDS_NEW_PASSWORD_WARNING } from './constants'

export const ChangePasswordForm = () => {
	const { user } = useAuth()

	if(user?.needsNewPassword) {
		return (
			<span>{NEEDS_NEW_PASSWORD_WARNING}</span>
		)
	}

	return null
}
