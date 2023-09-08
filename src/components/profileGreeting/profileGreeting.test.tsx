import React from 'react'
import { render } from '@testing-library/react'
import Chance from 'chance'
import { mockUser } from '../../mocks'
import { useAuth } from '../../contexts/auth'
import { ProfileGreeting } from './profileGreeting'

jest.mock('../../contexts/auth')

describe('Profile Greeting', () => {
	const chance = new Chance()

	it('should be able to render a profile greeting', () => {
		const fullName: string = chance.name()

		jest.mocked(useAuth).mockReturnValue({
			user: {
				...mockUser(),
				fullName,
			},
		} as any)

		const { getByText } = render(<ProfileGreeting />)

		expect(getByText(`Hello, ${fullName}`)).toBeInTheDocument()
	})

	it('should not render a profile greeting if there is no user', () => {
		jest.mocked(useAuth).mockReturnValue({} as any)

		const { container } = render(<ProfileGreeting />)

		expect(container).toBeEmptyDOMElement()
	})
})
