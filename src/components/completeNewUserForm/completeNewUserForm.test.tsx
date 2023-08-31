import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Chance from 'chance'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/auth'
import {
	FIRST_NAME_ID,
	LAST_NAME_ID,
	PASSWORD_ID,
	SUBMIT_LABEL,
} from './constants'
import { CompleteNewUserForm } from './completeNewUserForm'

jest.mock('next/navigation')
jest.mock('../../contexts/auth')

describe('Complete New User Form', () => {
	const chance = new Chance()

	beforeEach(() => {
		jest.mocked(useRouter).mockReturnValue({
			push: jest.fn(),
		} as any)
	})

	it('should be able to attempt to complete a new user account', () => {
		const attemptToCompleteNewUser = jest.fn().mockResolvedValue({})

		jest.mocked(useAuth).mockReturnValue({
			attemptToCompleteNewUser,
		} as any)

		const firstName: string = chance.first()
		const lastName: string = chance.first()
		const password: string = chance.word()
		const { container,  getByText } = render(<CompleteNewUserForm />)

		fireEvent.change(container.querySelector(`input[name="${FIRST_NAME_ID}"]`) as Element, { target: { value: firstName } })
		fireEvent.change(container.querySelector(`input[name="${LAST_NAME_ID}"]`) as Element, { target: { value: lastName } })
		fireEvent.change(container.querySelector(`input[name="${PASSWORD_ID}"]`) as Element, { target: { value: password } })

		fireEvent.click(getByText(SUBMIT_LABEL))

		expect(attemptToCompleteNewUser).toBeCalledWith(password, {
			family_name: lastName,
			given_name: firstName,
		})
	})
})
