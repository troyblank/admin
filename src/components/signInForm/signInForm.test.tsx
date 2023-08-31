import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Chance from 'chance'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/auth'
import {
	PASSWORD_ID,
	SUBMIT_LABEL,
	USER_NAME_ID,
} from './constants'
import { SignInForm } from './signInForm'

jest.mock('next/navigation')
jest.mock('../../contexts/auth')

describe('Sign In Form', () => {
	const chance = new Chance()

	beforeEach(() => {
		jest.mocked(useRouter).mockReturnValue({
			push: jest.fn(),
		} as any)
	})

	it('should be able to attempt to sign a user that needs to complete their account', () => {
		const attemptToSignIn = jest.fn().mockResolvedValue({ isValid: false })

		jest.mocked(useAuth).mockReturnValue({
			attemptToSignIn,
		} as any)

		const userName: string = chance.email()
		const password: string = chance.word()
		const { container } = render(<SignInForm />)

		fireEvent.change(container.querySelector(`input[name="${USER_NAME_ID}"]`) as Element, { target: { value: userName } })
		fireEvent.change(container.querySelector(`input[name="${PASSWORD_ID}"]`) as Element, { target: { value: password } })

		fireEvent.click(screen.getByText(SUBMIT_LABEL))

		expect(attemptToSignIn).toBeCalledWith(userName, password)
	})

	it('should be able to attempt to sign a user that needs to complete their account', () => {
		const attemptToSignIn = jest.fn().mockResolvedValue({ isValid: true })

		jest.mocked(useAuth).mockReturnValue({
			attemptToSignIn,
		} as any)

		const userName: string = chance.email()
		const password: string = chance.word()
		const { container,  getByText } = render(<SignInForm />)

		fireEvent.change(container.querySelector(`input[name="${USER_NAME_ID}"]`) as Element, { target: { value: userName } })
		fireEvent.change(container.querySelector(`input[name="${PASSWORD_ID}"]`) as Element, { target: { value: password } })

		fireEvent.click(getByText(SUBMIT_LABEL))

		expect(attemptToSignIn).toBeCalledWith(userName, password)
	})
})
