import React from 'react'
import { render } from '@testing-library/react'
import Chance from 'chance'
import { mockUser } from './mocks'
import { COMPLETE_NEW_USER_GREETING } from './components/completeNewUserForm/constants'
import { SIGN_IN_HEADER } from './components/signInForm/constants'
import * as AuthContext from './contexts/auth'
import {
	HOME_PATH,
	COMPLETE_USER_PATH,
	SIGN_IN_PATH,
} from './utils'
import { Router } from './router'

describe('Router', () => {
	const chance = new Chance()
	const protocol: string = 'https:'
	const productionHost: string = 'admin.troyblank.com'

	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			writable: true,
			value: {
				...window.location,
				protocol,
				host: productionHost,
				pathname: global.location,
				assign: jest.fn(),
			},
		})
	})

	it('should render the home page', async() => {
		window.location.pathname = HOME_PATH

		const fullName: string = chance.name()

		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
			user: {
				...mockUser(),
				isValid: true,
				fullName,
			},
		}) as any)

		const { getByText } = render(<Router />)

		expect(getByText(`Hello, ${fullName}`)).toBeInTheDocument()
	})

	it('should render the complete user page', async() => {
		window.location.pathname = COMPLETE_USER_PATH

		const { getByText } = render(<Router />)

		expect(getByText(COMPLETE_NEW_USER_GREETING)).toBeInTheDocument()
	})

	it('should render the sign in page', async() => {
		window.location.pathname = SIGN_IN_PATH

		const { getByText } = render(<Router />)

		expect(getByText(SIGN_IN_HEADER)).toBeInTheDocument()
	})
})
