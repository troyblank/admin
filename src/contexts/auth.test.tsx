import React from 'react'
import { act, render, fireEvent } from '@testing-library/react'
import { Auth } from 'aws-amplify'
import Chance from 'chance'
import { RequiredNewUserAttributesType } from '../types'
import { mockRequiredNewUserAttributes } from '../mocks'
import { AuthProvider, useAuth } from './auth'

describe('Use Auth', () => {
	const chance = new Chance()

	type PropsType = {
        signInUserName?: string,
        signInPassword?: string,
		completeUserPassword?: string,
		completeUserAttributes?:  RequiredNewUserAttributesType
	}
	const ATTEMPT_TO_SIGN_IN_ID = 'auth test attempt to sign in button'
	const ATTEMPT_TO_COMPLETE_USER = 'auth test attempt to complete user'

	const AuthTestComponent: React.FC<PropsType> = ({
		signInUserName = chance.name(),
		signInPassword = chance.word(),
		completeUserPassword = chance.word(),
		completeUserAttributes = mockRequiredNewUserAttributes(),
	}) => {
		const {
			attemptToSignIn,
			attemptToCompleteNewUser,
		} = useAuth()

		return (
			<React.Fragment>
				<button
					data-testid={ATTEMPT_TO_SIGN_IN_ID}
					onClick={() => attemptToSignIn(signInUserName, signInPassword)}
					type={'button'}
				/>
				<button
					data-testid={ATTEMPT_TO_COMPLETE_USER}
					onClick={() => attemptToCompleteNewUser(completeUserPassword, completeUserAttributes)}
					type={'button'}
				/>
			</React.Fragment>
		)
	}

	beforeEach(() => {
		jest.spyOn(Auth, 'currentAuthenticatedUser').mockResolvedValue({})
	})

	it('should allow attempts to sign in', async () => {
		const signInUserName: string = chance.name()
		const signInPassword: string = chance.word()

		const username: string = chance.first()
		jest.spyOn(Auth, 'signIn').mockResolvedValue({
			challengeName: 'NO_CHALLENGE',
			challengeParam: {
				requiredAttributes: [],
			},
			username,
		})

		const { getByTestId } =  render(<AuthProvider user={null}>
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

	it('should handle any errors with attempts to sign in', async () => {
		const signInUserName: string = chance.name()
		const signInPassword: string = chance.word()

		const error: string = chance.paragraph()
		jest.spyOn(Auth, 'signIn').mockRejectedValue(error)
		jest.spyOn(window, 'alert')

		const { getByTestId } =  render(<AuthProvider user={null}>
			<AuthTestComponent
				signInUserName={signInUserName}
				signInPassword={signInPassword}
			/>
		</AuthProvider>,
		)

		await act(async () => {
			fireEvent.click(getByTestId(ATTEMPT_TO_SIGN_IN_ID))
		})

		expect(window.alert).toBeCalledWith(error)
	})

	it('should allow attempts to complete a new user', async () => {
		const completeUserPassword: string = chance.word()
		const completeUserAttributes: RequiredNewUserAttributesType = mockRequiredNewUserAttributes()

		const username = chance.name()
		const cognitoUser: any = {
			challengeName: 'NO_CHALLENGE',
			challengeParam: {
				requiredAttributes: [],
			},
			username,
		}
		jest.spyOn(Auth, 'completeNewPassword').mockResolvedValue(cognitoUser)
		jest.spyOn(Auth, 'currentAuthenticatedUser').mockResolvedValue(cognitoUser)

		const { getByTestId } =  render(<AuthProvider user={null}>
			<AuthTestComponent
				completeUserPassword={completeUserPassword}
				completeUserAttributes={completeUserAttributes}
			/>
		</AuthProvider>,
		)

		await act(async () => {
			fireEvent.click(getByTestId(ATTEMPT_TO_COMPLETE_USER))
		})

		expect(Auth.completeNewPassword).toBeCalledWith(cognitoUser, completeUserPassword, completeUserAttributes)
	})

	it('should handle any errors with attempts to complete a new user', async () => {
		const completeUserPassword: string = chance.word()
		const completeUserAttributes: RequiredNewUserAttributesType = mockRequiredNewUserAttributes()

		const username = chance.name()
		const cognitoUser: any = {
			challengeName: 'NO_CHALLENGE',
			challengeParam: {
				requiredAttributes: [],
			},
			username,
		}

		const error: string = chance.paragraph()
		jest.spyOn(Auth, 'completeNewPassword').mockRejectedValue(error)
		jest.spyOn(Auth, 'currentAuthenticatedUser').mockResolvedValue(cognitoUser)

		const { getByTestId } = render(<AuthProvider user={null}>
			<AuthTestComponent
				completeUserPassword={completeUserPassword}
				completeUserAttributes={completeUserAttributes}
			/>
		</AuthProvider>,
		)

		await act(async () => {
			fireEvent.click(getByTestId(ATTEMPT_TO_COMPLETE_USER))
		})

		expect(window.alert).toBeCalledWith(error)
	})
})
