import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Chance from 'chance'
import { useAuth } from '../../contexts/auth'
import { OLD_PASSWORD_ID, NEW_PASSWORD_ID, SUBMIT_LABEL } from './constants'
import { ChangePasswordForm } from './changePasswordForm'

// jest.mock('next/navigation')
jest.mock('../../contexts/auth')

describe('Change Password Form', () => {
	const chance = new Chance()

	it('should be able to change a password', async() => {
		const attemptToChangePassword = jest.fn().mockResolvedValue(undefined)

		jest.mocked(useAuth).mockReturnValue({
			attemptToChangePassword,
		} as any)

		const { container, getByText } = render(<ChangePasswordForm />)

		await waitFor(() => {
			fireEvent.click(getByText('Change password'))
		})

		await waitFor(() => {
			fireEvent.change(container.querySelector(`input[name="${OLD_PASSWORD_ID}"]`) as Element, { target: { value: String(chance.guid()) } })
			fireEvent.change(container.querySelector(`input[name="${NEW_PASSWORD_ID}"]`) as Element, { target: { value: String(chance.guid()) } })

			fireEvent.click(getByText(SUBMIT_LABEL))
		})

		expect(getByText('Your password changed successfully!')).toBeInTheDocument()
	})
})
