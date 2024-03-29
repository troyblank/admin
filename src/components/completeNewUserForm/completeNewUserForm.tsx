import React, { useState, Fragment, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import { HOME_PATH } from '../../utils'
import { useAuth } from '../../contexts'
import {
	COMPLETE_NEW_USER_GREETING,
	COMPLETE_NEW_USER_INSTRUCTIONS,
	FIRST_NAME_ID,
	LAST_NAME_ID,
	PASSWORD_ID,
	SUBMIT_LABEL,
} from './constants'

export const CompleteNewUserForm = () => {
	const { push } = useRouter()
	const { attemptToCompleteNewUser } = useAuth()
	const [firstName, setFirstName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const onChangePassword = (event: SyntheticEvent): void => {
		attemptToCompleteNewUser(password, {
			family_name: lastName,
			given_name: firstName,
		}).then(() => push(HOME_PATH))

		event.preventDefault()
	}

	return (
		<Fragment>
			<h1>{COMPLETE_NEW_USER_GREETING}</h1>
			<p>{COMPLETE_NEW_USER_INSTRUCTIONS}</p>
			<form method={'post'} onSubmit={onChangePassword}>
				<div>
					<label htmlFor={FIRST_NAME_ID}>First Name:</label>
					<input
						type={'text'}
						id={FIRST_NAME_ID}
						name={FIRST_NAME_ID}
						value={firstName}
						onChange={({ target }) => setFirstName(target.value)}
						required={true}
					/>
				</div>
				<div>
					<label htmlFor={LAST_NAME_ID}>Last Name:</label>
					<input
						type={'text'}
						id={LAST_NAME_ID}
						name={LAST_NAME_ID}
						value={lastName}
						onChange={({ target }) => setLastName(target.value)}
						required={true}
					/>
				</div>
				<div>
					<label htmlFor={PASSWORD_ID}>New Password:</label>
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
				<br />
				<button type={'submit'}>{SUBMIT_LABEL}</button>
			</form>
		</Fragment>
	)
}
