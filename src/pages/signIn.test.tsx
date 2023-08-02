import React from 'react'
import { render } from '@testing-library/react'
import { SIGN_IN_HEADER } from '../components/signInForm/constants'
import { SignInPage } from './signIn'

jest.mock('react-router-dom')

describe('Sign In Page', () => {

	it('should be able to render the sign in page', () => {
		const { getByText } = render(<SignInPage />)

		expect(getByText(SIGN_IN_HEADER)).toBeInTheDocument()
	})
})
