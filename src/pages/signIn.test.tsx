import React from 'react'
import { render } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { SIGN_IN_HEADER } from '../components/signInForm/constants'
import { SignInPage } from './signIn'

jest.mock('next/navigation')

describe('Sign In Page', () => {

	beforeEach(() => {
		jest.mocked(useRouter).mockReturnValue({
			push: jest.fn(),
		} as any)
	})

	it('should be able to render the sign in page', () => {
		const { getByText } = render(<SignInPage />)

		expect(getByText(SIGN_IN_HEADER)).toBeInTheDocument()
	})
})
