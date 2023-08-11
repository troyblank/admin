import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts'
import { SIGN_IN_PATH } from '../../utils'

type PropsType = {
	children: ReactElement,
}

export const RequiresAuthentication: React.FC<PropsType> = ({ children }) => {
	const navigate = useNavigate()
	const { user } = useAuth()

	if (!user?.isValid) {
		navigate(SIGN_IN_PATH)

		return null
	}

	return children
}
