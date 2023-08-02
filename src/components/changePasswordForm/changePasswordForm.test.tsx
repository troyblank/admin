import React from 'react'
import { render } from '@testing-library/react'
import { mockUser } from '../../mocks'
import * as AuthContext from '../../contexts/auth'
import { NEEDS_NEW_PASSWORD_WARNING } from './constants'
import { ChangePasswordForm } from './changePasswordForm'

describe('Change Password Form', () => {

	it('should show a change password warning if they need to upgrade their password', () => {
		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
			user: {
				...mockUser(),
				needsNewPassword: true,
			},
		}) as any)

		const { getByText } = render(<ChangePasswordForm />)

		expect(getByText(NEEDS_NEW_PASSWORD_WARNING)).toBeInTheDocument()
	})

	it('should not show a change password warning if they need to upgrade their password', () => {
		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
			user: {
				...mockUser(),
				needsNewPassword: false,
			},
		}) as any)

		const { queryByText } = render(<ChangePasswordForm />)

		expect(queryByText(NEEDS_NEW_PASSWORD_WARNING)).not.toBeInTheDocument()
	})
})
