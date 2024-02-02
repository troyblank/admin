import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Chance from 'chance'
import { mockUser } from '../../mocks'
import { useAuth } from '../../contexts/auth'
import { TokenBox } from './tokenBox'

jest.mock('../../contexts/auth')

describe('Token Box', () => {
	const chance = new Chance()

	it('should be able to show and hide a token box', () => {
		const jwtToken: string = chance.guid()

		jest.mocked(useAuth).mockReturnValue({
			user: {
				...mockUser(),
				jwtToken,
			},
		} as any)

		const { getByText, queryByText } = render(<TokenBox />)

		fireEvent.click(getByText('Show token'))

		expect(getByText(jwtToken)).toBeInTheDocument()

		fireEvent.click(getByText('Hide token'))

		expect(queryByText(jwtToken)).not.toBeInTheDocument()
	})

	it('should not render a token box if there is no user', () => {
		jest.mocked(useAuth).mockReturnValue({} as any)

		const { container } = render(<TokenBox />)

		expect(container).toBeEmptyDOMElement()
	})
})
