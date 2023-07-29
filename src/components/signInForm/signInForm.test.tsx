import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import * as Contexts from '../../contexts/auth'
import Chance from 'chance'
import {
	PASSWORD_ID,
	SIGN_IN_HEADER,
	SUBMIT_LABEL,
	USER_NAME_ID,
} from './constants'
import { SignInForm } from './signInForm'


describe('Sign In Form', () => {
	const chance = new Chance()

	it('should be able to render', () => {
		const { getByText } = render(<SignInForm />)

		expect(getByText(SIGN_IN_HEADER)).toBeInTheDocument()
	})

	it('should be able to attempt to sign a user in', () => {
		const attemptToSignIn = jest.fn().mockResolvedValue({})

		jest.spyOn(Contexts, 'useAuth').mockImplementation(() => ({
			attemptToSignIn,
		}) as any)

		const userName: string = chance.email()
		const password: string = chance.word()
		const { container,  getByText } = render(<SignInForm />)

		fireEvent.change(container.querySelector(`input[name="${USER_NAME_ID}"]`) as Element, { target: { value: userName } })
		fireEvent.change(container.querySelector(`input[name="${PASSWORD_ID}"]`) as Element, { target: { value: password } })

		fireEvent.click(getByText(SUBMIT_LABEL))

		expect(attemptToSignIn).toBeCalledWith(userName, password)
	})
})
