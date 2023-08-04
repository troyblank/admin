import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Chance from 'chance'
import * as ReactRouterDom from 'react-router-dom'
import * as AuthContext from '../../contexts/auth'
import {
	FIRST_NAME_ID,
	LAST_NAME_ID,
	PASSWORD_ID,
	SUBMIT_LABEL,
} from './constants'
import { CompleteNewUserForm } from './completeNewUserForm'

jest.mock('react-router-dom')

describe('Complete New User Form', () => {
	const chance = new Chance()

	it('should be able to attempt to complete a new user account', () => {
		const attemptToCompleteNewUser = jest.fn().mockResolvedValue({})

		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
			attemptToCompleteNewUser,
		}) as any)

		jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn())

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
