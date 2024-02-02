import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Chance from 'chance'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '../../contexts/auth'
import {
	CONFIRMATION_CODE_ID,
	NEW_PASSWORD_ID,
	SUBMIT_LABEL,
	USER_NAME_ID,
} from './constants'
import { ForgotPasswordForm } from './forgotPasswordForm'

jest.mock('next/navigation')
jest.mock('../../contexts/auth')

describe('Forgot Password Form', () => {
	const chance = new Chance()

	beforeEach(() => {
		jest.mocked(useSearchParams).mockReturnValue({ get: () => '' } as any)
	})

	it('should be able to attempt to get a reset password code and reset a password', async() => {
		const attemptToGetResetPasswordCode = jest.fn().mockResolvedValue({ isPasswordResetCodeSent: true })
		const attemptToResetPassword = jest.fn().mockResolvedValue(undefined)

		jest.mocked(useAuth).mockReturnValue({
			attemptToGetResetPasswordCode,
			attemptToResetPassword,
		} as any)

		const { container, getByText } = render(<ForgotPasswordForm />)

		await waitFor(() => {
			fireEvent.change(container.querySelector(`input[name="${USER_NAME_ID}"]`) as Element, { target: { value: chance.email() } })

			fireEvent.click(getByText(SUBMIT_LABEL))
		})

		expect(getByText('A reset password confirmation code was just sent to your email.', { exact: false })).toBeInTheDocument()

		await waitFor(() => {
			fireEvent.change(container.querySelector(`input[name="${CONFIRMATION_CODE_ID}"]`) as Element, { target: { value: String(chance.guid()) } })
			fireEvent.change(container.querySelector(`input[name="${NEW_PASSWORD_ID}"]`) as Element, { target: { value: String(chance.word()) } })

			fireEvent.click(getByText(SUBMIT_LABEL))
		})

		expect(getByText('Your password has been reset.')).toBeInTheDocument()
	})

	it('should be able to attempt to get a reset password code and reset a password with no redirect query param', async() => {
		const attemptToGetResetPasswordCode = jest.fn().mockResolvedValue({ isPasswordResetCodeSent: true })
		const attemptToResetPassword = jest.fn().mockResolvedValue(undefined)

		jest.mocked(useSearchParams).mockReturnValue({ get: () => null } as any)
		jest.mocked(useAuth).mockReturnValue({
			attemptToGetResetPasswordCode,
			attemptToResetPassword,
		} as any)

		const { container, getByText } = render(<ForgotPasswordForm />)

		await waitFor(() => {
			fireEvent.change(container.querySelector(`input[name="${USER_NAME_ID}"]`) as Element, { target: { value: chance.email() } })

			fireEvent.click(getByText(SUBMIT_LABEL))
		})

		await waitFor(() => {
			fireEvent.change(container.querySelector(`input[name="${CONFIRMATION_CODE_ID}"]`) as Element, { target: { value: String(chance.guid()) } })
			fireEvent.change(container.querySelector(`input[name="${NEW_PASSWORD_ID}"]`) as Element, { target: { value: String(chance.word()) } })

			fireEvent.click(getByText(SUBMIT_LABEL))
		})

		expect(getByText('Your password has been reset.')).toBeInTheDocument()
	})
})
