import { act, renderHook  } from '@testing-library/react'
import { Auth } from 'aws-amplify'
import Chance from 'chance'
import { RequiredNewUserAttributesType } from '../types'
import { mockRequiredNewUserAttributes } from '../mocks'
import { AuthProvider, useAuth } from './auth'

describe('Use Auth', () => {
	const chance = new Chance()

	beforeEach(() => {
		jest.spyOn(Auth, 'currentAuthenticatedUser').mockResolvedValue({})
	})

	it('should allow attempts to sign in', async () => {
		const signInUserName: string = chance.name()
		const signInPassword: string = chance.word()
		const username: string = chance.first()

		jest.spyOn(Auth, 'signIn').mockResolvedValue({
			challengeName: 'NO_CHALLENGE',
			challengeParam: {},
			username,
		})

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToSignIn } = result.current

		await act(() => attemptToSignIn(signInUserName, signInPassword))

		expect(Auth.signIn).toBeCalledWith(signInUserName, signInPassword)
	})

	it('should handle any errors with attempts to sign in', async () => {
		const signInUserName: string = chance.name()
		const signInPassword: string = chance.word()

		const error: string = chance.paragraph()
		jest.spyOn(Auth, 'signIn').mockRejectedValue(error)
		jest.spyOn(window, 'alert')

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToSignIn } = result.current

		expect(async() => await attemptToSignIn(signInUserName, signInPassword)).rejects.toThrow(error)
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

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToCompleteNewUser } = result.current

		await act(async () => attemptToCompleteNewUser(completeUserPassword, completeUserAttributes))

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

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToCompleteNewUser } = result.current

		expect(async() => await attemptToCompleteNewUser(completeUserPassword, completeUserAttributes)).rejects.toThrow(error)
	})
})
