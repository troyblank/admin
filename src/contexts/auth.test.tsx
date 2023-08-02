import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Auth } from 'aws-amplify'
import Chance from 'chance'
import { AuthProvider, useAuth } from './auth'

describe('Use Auth', () => {
	const chance = new Chance()

	type PropsType = {
        userName?: string,
        password?: string,
	}
	const ATTEMPT_TO_SIGN_IN_ID = 'auth test attempt to sign in button'

	const AuthTestComponent: React.FC<PropsType> = ({
		userName = chance.name(),
		password = chance.word(),
	}) => {
		const {
			attemptToSignIn,
		} = useAuth()

		return (
			<React.Fragment>
				<button
					data-testid={ATTEMPT_TO_SIGN_IN_ID}
					onClick={() => attemptToSignIn(userName, password)}
					type={'button'}
				/>
			</React.Fragment>
		)
	}

	it('should allow attempts to sign in', () => {
		const userName: string = chance.name()
		const password: string = chance.word()

		jest.spyOn(Auth, 'signIn').mockResolvedValue({})

		const { getByTestId } = render(<AuthProvider>
			<AuthTestComponent
				userName={userName}
				password={password}
			/>
		</AuthProvider>)

		fireEvent.click(getByTestId(ATTEMPT_TO_SIGN_IN_ID))

		expect(Auth.signIn).toBeCalledWith(userName, password)
	})
})
