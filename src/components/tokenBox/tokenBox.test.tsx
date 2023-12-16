import React from 'react'
import { render } from '@testing-library/react'
import Chance from 'chance'
import { mockUser } from '../../mocks'
import { useAuth } from '../../contexts/auth'
import { TokenBox } from './tokenBox'

jest.mock('../../contexts/auth')

describe('Token Box', () => {
	const chance = new Chance()

	it('should be able to render a token box', () => {
		const jwtToken: string = chance.guid()

		jest.mocked(useAuth).mockReturnValue({
			user: {
				...mockUser(),
				jwtToken,
			},
		} as any)

		const { getByText } = render(<TokenBox />)

		expect(getByText(jwtToken)).toBeInTheDocument()
	})

	it('should not render a token box if there is no user', () => {
		jest.mocked(useAuth).mockReturnValue({} as any)

		const { container } = render(<TokenBox />)

		expect(container).toBeEmptyDOMElement()
	})
})
