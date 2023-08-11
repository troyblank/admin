import React from 'react'
import { render } from '@testing-library/react'
import Chance from 'chance'
import * as ReactRouterDom from 'react-router-dom'
import { mockUser } from '../../mocks'
import * as AuthContext from '../../contexts/auth'
import { SIGN_IN_PATH } from '../../utils'
import { RequiresAuthentication } from './requiresAuthentication'

jest.mock('react-router-dom')

describe('Requires Authentication', () => {
	const chance = new Chance()

	it('should be able to render children if the user is valid', () => {
		const someText: string = chance.paragraph()
		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
			user: {
				...mockUser(),
				isValid: true,
			},
		}) as any)

		const { getByText } = render(<RequiresAuthentication>
			<p>{someText}</p>
		</RequiresAuthentication>)

		expect(getByText(someText)).toBeInTheDocument()
	})

	it('should redirect the user to the login screen if the user is not valid', () => {
		const navigate = jest.fn()
		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
			user: {
				...mockUser(),
				isValid: false,
			},
		}) as any)
		jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(navigate)

		render(<RequiresAuthentication>
			<p>{chance.paragraph()}</p>
		</RequiresAuthentication>)

		expect(navigate).toBeCalledWith(SIGN_IN_PATH)
	})
})
