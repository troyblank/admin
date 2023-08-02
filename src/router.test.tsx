import React from 'react'
import { render } from '@testing-library/react'
import Chance from 'chance'
import { mockUser } from './mocks'
import { SIGN_IN_HEADER } from './components/signInForm/constants'
import * as AuthContext from './contexts/auth'
import { HOME_PATH, PROFILE_PATH, SIGN_IN_PATH } from './utils'
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

		const { getByText } = render(<Router />)

		expect(getByText('This is the home page', {exact: false})).toBeInTheDocument()
	})

	it('should render the sign in page', async() => {
		window.location.pathname = SIGN_IN_PATH

		const { getByText } = render(<Router />)

		expect(getByText(SIGN_IN_HEADER)).toBeInTheDocument()
	})

	it('should render the profile page', async() => {
		window.location.pathname = PROFILE_PATH

		const userName: string = chance.name()

		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
			user: {
				...mockUser(),
				userName,
			},
		}) as any)

		const { getByText } = render(<Router />)

		expect(getByText(`Hello, ${userName}`)).toBeInTheDocument()
	})
})
