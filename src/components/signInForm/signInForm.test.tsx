import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import * as ReactRouterDom from 'react-router-dom'
import * as AuthContext from '../../contexts/auth'
import Chance from 'chance'
import {
	PASSWORD_ID,
	SUBMIT_LABEL,
	USER_NAME_ID,
} from './constants'
import { SignInForm } from './signInForm'

jest.mock('react-router-dom')

describe('Sign In Form', () => {
	const chance = new Chance()

	it('should be able to attempt to sign a user that needs a new password', () => {
		const attemptToSignIn = jest.fn().mockResolvedValue({ needsNewPassword: true })

		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
			attemptToSignIn,
		}) as any)

		jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn())

		const userName: string = chance.email()
		const password: string = chance.word()
		const { container,  getByText } = render(<SignInForm />)

		fireEvent.change(container.querySelector(`input[name="${USER_NAME_ID}"]`) as Element, { target: { value: userName } })
		fireEvent.change(container.querySelector(`input[name="${PASSWORD_ID}"]`) as Element, { target: { value: password } })

		fireEvent.click(getByText(SUBMIT_LABEL))

		expect(attemptToSignIn).toBeCalledWith(userName, password)
	})
})
