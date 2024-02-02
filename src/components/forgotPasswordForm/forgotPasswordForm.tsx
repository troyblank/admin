import React, { useState, type SyntheticEvent } from 'react'
import Link from 'next/link'
import { useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation'
import { type RestPasswordCodeOutput } from '../../types'
import { useAuth } from '../../contexts/auth'
import { SIGN_IN_PATH } from '../../utils'
import {
	CONFIRMATION_CODE_ID,
	NEW_PASSWORD_ID,
	SUBMIT_LABEL,
	USER_NAME_ID,
} from './constants'

export const ForgotPasswordForm = () => {
	const searchParams: ReadonlyURLSearchParams = useSearchParams()
	const { attemptToGetResetPasswordCode, attemptToResetPassword } = useAuth()
	const [username, setUserName] = useState<string>('')
	const [confirmationCode, setConfirmationCode] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [isResetCodeSent, setIsResetCodeSent] = useState<boolean>(false)
	const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false)

	const onSendResetCode = (event: SyntheticEvent): void => {
		attemptToGetResetPasswordCode(username).then(({ isPasswordResetCodeSent }: RestPasswordCodeOutput) => {
			setIsResetCodeSent(isPasswordResetCodeSent)
		})

		event.preventDefault()
	}

	const onPasswordReset = (event: SyntheticEvent): void => {
		attemptToResetPassword({ username, confirmationCode, newPassword }).then(() => {
			setIsPasswordReset(true)
		})

		event.preventDefault()
	}

	return (
		<React.Fragment>
			{ !isPasswordReset &&
				<form method={'post'} onSubmit={(event: SyntheticEvent) => isResetCodeSent ? onPasswordReset(event) : onSendResetCode(event) }>
					<h1>Forgot Password</h1>
					<p>Please enter your email or username below to start the process of resetting your password.</p>
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
					{ isResetCodeSent &&
						<div>
							<p>A reset password confirmation code was just sent to your email. Please use this code to reset your password.</p>
							<label htmlFor={CONFIRMATION_CODE_ID}>Confirmation Code:</label>
							<input
								type={'text'}
								id={CONFIRMATION_CODE_ID}
								name={CONFIRMATION_CODE_ID}
								value={confirmationCode}
								onChange={({ target }) => setConfirmationCode(target.value)}
								required={true}
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
						</div>
					}
					<br />
					<button type={'submit'}>{SUBMIT_LABEL}</button>
				</form>
			}
			{ isPasswordReset &&
				<React.Fragment>
					<p>Your password has been reset.</p>
					<Link
						href={searchParams.get('redirect') ?? SIGN_IN_PATH }
					>
						Return to application.
					</Link>
				</React.Fragment>
			}
		</React.Fragment>
	)
}
