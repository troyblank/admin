import React from 'react'
import { act, render, fireEvent } from '@testing-library/react'
import { Auth } from 'aws-amplify'
import Chance from 'chance'
import { AuthProvider, useAuth } from './auth'

describe('Use Auth', () => {
	const chance = new Chance()

	type PropsType = {
        signInUserName?: string,
        signInPassword?: string,
	}
	const ATTEMPT_TO_SIGN_IN_ID = 'auth test attempt to sign in button'

	const AuthTestComponent: React.FC<PropsType> = ({
		signInUserName = chance.name(),
		signInPassword = chance.word(),
	}) => {
		const {
			attemptToSignIn,
		} = useAuth()

		return (
			<React.Fragment>
				<button
					data-testid={ATTEMPT_TO_SIGN_IN_ID}
					onClick={() => attemptToSignIn(signInUserName, signInPassword)}
					type={'button'}
				/>
			</React.Fragment>
		)
	}

	it('should allow attempts to sign in', async () => {
		const signInUserName: string = chance.name()
		const signInPassword: string = chance.word()

		const username = chance.name()
		jest.spyOn(Auth, 'signIn').mockResolvedValue({
			challengeName: 'NO_CHALLENGE',
			challengeParam: {
				requiredAttributes: [],
			},
			username,
		})

		const { getByTestId } =  render(<AuthProvider>
			<AuthTestComponent
				signInUserName={signInUserName}
				signInPassword={signInPassword}
			/>
		</AuthProvider>,
		)

		await act(async () => {
			fireEvent.click(getByTestId(ATTEMPT_TO_SIGN_IN_ID))
		})

		expect(Auth.signIn).toBeCalledWith(signInUserName, signInPassword)
	})
})
