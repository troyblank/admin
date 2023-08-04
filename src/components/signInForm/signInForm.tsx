import React, { useState, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserType } from '../../types'
import { useAuth } from '../../contexts'
import { COMPLETE_USER_PATH, HOME_PATH } from '../../utils'
import {
	PASSWORD_ID,
	SIGN_IN_HEADER,
	SUBMIT_LABEL,
	USER_NAME_ID,
} from './constants'

export const SignInForm = () => {
	const navigate = useNavigate()
	const { attemptToSignIn } = useAuth()
	const [userName, setUserName] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	// const [redirectsToNewPasswordPage, setRedirectsToNewPasswordPage] = useState<boolean>(false)

	const onSignIn = (event: SyntheticEvent): void => {
		attemptToSignIn(userName, password).then((user: UserType) => {
			const { isValid } = user

			if (isValid) {
				navigate(HOME_PATH)
			} else {
				navigate(COMPLETE_USER_PATH)
			}
		})

		event.preventDefault()
	}

	return (
		<form method={'post'} onSubmit={onSignIn}>
			<h1>{ SIGN_IN_HEADER }</h1>
			<div>
				<label htmlFor={USER_NAME_ID}>Username:</label>
				<input
					type={'text'}
					id={USER_NAME_ID}
					name={USER_NAME_ID}
					value={userName}
					onChange={({ target }) => setUserName(target.value)}
				/>
			</div>
			<div>
				<label htmlFor={PASSWORD_ID}>Password:</label>
				<input
					type={'password'}
					id={PASSWORD_ID}
					name={PASSWORD_ID}
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type={'submit'}>{SUBMIT_LABEL}</button>
		</form>
	)
}
