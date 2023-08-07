import React from 'react'
import { render } from '@testing-library/react'
import Chance from 'chance'
import { mockUser } from '../../mocks'
import * as AuthContext from '../../contexts/auth'
import { TokenBox } from './tokenBox'

describe('Token Box', () => {
	const chance = new Chance()

	it('should be able to render a profile greeting', () => {
		const jwtToken: string = chance.guid()

		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
			user: {
				...mockUser(),
				jwtToken,
			},
		}) as any)

		const { getByText } = render(<TokenBox />)

		expect(getByText(jwtToken)).toBeInTheDocument()
	})

	it('should not render a profile greeting if there is no user', () => {
		jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({}) as any)

		const { container } = render(<TokenBox />)

		expect(container).toBeEmptyDOMElement()
	})
})
