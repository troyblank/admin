import React from 'react'
import { render } from '@testing-library/react'
import { SIGN_IN_HEADER } from './components/signInForm/constants'
import { CHANGE_PASSWORD_PATH, HOME_PATH, SIGN_IN_PATH } from './utils'
import Router from './router'

describe('Router', () => {
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

	it('should render the change password page', async() => {
		window.location.pathname = CHANGE_PASSWORD_PATH

		const { getByText } = render(<Router />)

		expect(getByText('you must change your password boi')).toBeInTheDocument()
	})
})
