import React, { useState, type SyntheticEvent } from 'react'
import { useAuth } from '../../contexts/auth'
import { NEW_PASSWORD_ID, OLD_PASSWORD_ID, SUBMIT_LABEL } from './constants'

export const ChangePasswordForm = () => {
	const [isShowingForm, setIsShowingForm] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const { attemptToChangePassword } = useAuth()
	const [oldPassword, setOldPassword] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')

	const onPasswordChange = (event: SyntheticEvent): void => {
		attemptToChangePassword({ oldPassword, newPassword }).then(() => {
			setIsSuccess(true)
		})

		event.preventDefault()
	}

	if (isSuccess) {
		return <p>Your password changed successfully!</p>
	}

	if (isShowingForm) {
		return (
			<form method={'post'} onSubmit={onPasswordChange}>
				<label htmlFor={OLD_PASSWORD_ID}>Old password:</label>
				<input
					type={'password'}
					id={OLD_PASSWORD_ID}
					name={OLD_PASSWORD_ID}
					value={oldPassword}
					onChange={({ target }) => setOldPassword(target.value)}
					required={true}
					minLength={8}
				/>
				<br /><br />
				<label htmlFor={NEW_PASSWORD_ID}>New Password:</label>
				<input
					type={'password'}
					id={NEW_PASSWORD_ID}
					name={NEW_PASSWORD_ID}
					value={newPassword}
					onChange={({ target }) => setNewPassword(target.value)}
					required={true}
					minLength={8}
				/>
				<br /><br />
				<button type={'submit'}>{SUBMIT_LABEL}</button>
			</form>
		)
	}

	return (
		<button onClick={() => setIsShowingForm(true)}>Change password</button>
	)
}
