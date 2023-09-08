import React, { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import { UserType } from '../../types'
import { useAuth } from '../../contexts/auth'
import { COMPLETE_USER_PATH, HOME_PATH } from '../../utils'
import {
	PASSWORD_ID,
	SIGN_IN_HEADER,
	SUBMIT_LABEL,
	USER_NAME_ID,
} from './constants'

export const SignInForm = () => {
	const { push } = useRouter()
	const { attemptToSignIn } = useAuth()
	const [userName, setUserName] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const onSignIn = (event: SyntheticEvent): void => {
		attemptToSignIn(userName, password).then((user: UserType | null) => {
			if (user !== null && user?.isValid) {
				push(HOME_PATH)
			} else {
				push(COMPLETE_USER_PATH)
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
