import React, { useState, type SyntheticEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type SignInOutput } from '../../types'
import { useAuth } from '../../contexts/auth'
import {
	COMPLETE_USER_PATH,
	FORGOT_PASSWORD_PATH,
	HOME_PATH,
	SIGN_IN_PATH,
} from '../../utils'
import {
	PASSWORD_ID,
	SIGN_IN_HEADER,
	SUBMIT_LABEL,
	USER_NAME_ID,
} from './constants'

export const SignInForm = () => {
	const { push } = useRouter()
	const { attemptToSignIn } = useAuth()
	const [username, setUserName] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const onSignIn = (event: SyntheticEvent): void => {
		attemptToSignIn({ username, password }).then(({ isUserComplete }: SignInOutput) => {
			if (isUserComplete) {
				push(HOME_PATH)
			} else {
				push(COMPLETE_USER_PATH)
			}
		})

		event.preventDefault()
	}

	return (
		<React.Fragment>
			<form method={'post'} onSubmit={onSignIn}>
				<h1>{ SIGN_IN_HEADER }</h1>
				<div>
					<label htmlFor={USER_NAME_ID}>Username:</label>
					<input
						type={'text'}
						id={USER_NAME_ID}
						name={USER_NAME_ID}
						value={username}
						onChange={({ target }) => setUserName(target.value)}
						required={true}
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
						required={true}
						minLength={8}
					/>
				</div>
				<button type={'submit'}>{SUBMIT_LABEL}</button>
			</form>
			<br />
			<Link
				href={`${FORGOT_PASSWORD_PATH}?redirect=${SIGN_IN_PATH}`}
			>
				Forgot password?
			</Link>
		</React.Fragment>
	)
}
