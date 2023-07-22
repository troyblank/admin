import React, { useState } from 'react'
import { useAuth } from '../../contexts'
import { SIGN_IN_HEADER } from './constants'

export const SignInForm = () => {
	const { attemptToSignIn } = useAuth()
	const [userName, setUserName] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const onSignIn = (e: Event) => {
		attemptToSignIn( userName, password ).then((user) => {
			console.log(user)
		})

        e.preventDefault();
    };

	return (
		<form method={'post'} onSubmit={onSignIn}>
			<h1>{ SIGN_IN_HEADER }</h1>
			<div>
				<label htmlFor={'username'}>Username:</label>
				<input
					id={'username'}
					type={'text'}
					name={'username'}
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor={'password'}>Password:</label>
				<input
					id={'password'}
					type={'password'}
					name={'password'}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type={'submit'}>Submit</button>
		</form>
	)
}
