import React from 'react'
import { render } from '@testing-library/react'
import Chance from 'chance'
import { mockUser } from '../../mocks'
import * as AuthContext from '../../contexts/auth'
import { ProfileGreeting } from './profileGreeting'

describe('Profile Greeting', () => {
	const chance = new Chance()

	it('should be able to render a profile greeting', () => {
		const fullName: string = chance.name()

		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
			user: {
				...mockUser(),
				fullName,
			},
		}) as any)

		const { getByText } = render(<ProfileGreeting />)

		expect(getByText(`Hello, ${fullName}`)).toBeInTheDocument()
	})

	it('should not render a profile greeting if there is no user', () => {
		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({}) as any)

		const { container } = render(<ProfileGreeting />)

		expect(container).toBeEmptyDOMElement()
	})
})
