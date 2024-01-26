import { act, renderHook } from '@testing-library/react'
import { confirmSignIn, signIn } from 'aws-amplify/auth'
import Chance from 'chance'
import { type UserAttributes } from '../types'
// import { mockRequiredNewUserAttributes } from '../mocks'
import { AuthProvider, useAuth } from './auth'

jest.mock('aws-amplify/auth')

describe('Use Auth', () => {
	const chance = new Chance()

	beforeEach(() => {
		jest.mocked(signIn).mockResolvedValue({
			isSignedIn: chance.bool(),
			nextStep: { signInStep: 'DONE' },
		} as any)
	})

	it('should allow attempts to sign in', async () => {
		const username: string = chance.first()
		const password: string = chance.word()

		jest.mocked(signIn).mockResolvedValue({
			isSignedIn: true,
			nextStep: { signInStep: 'DONE' },
		} as any)

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToSignIn } = result.current

		await act(async() => await attemptToSignIn({ username, password }))

		expect(signIn).toHaveBeenCalledWith({ username, password })
	})

	it('should handle any errors with attempts to sign in', async () => {
		const username: string = chance.name()
		const password: string = chance.word()

		const error: string = chance.paragraph()
		jest.mocked(signIn).mockRejectedValue(error)
		jest.spyOn(window, 'alert')

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToSignIn } = result.current

		expect(async() => await attemptToSignIn({ username, password })).rejects.toThrow(error)
	})

	it('should handle any errors with any nextStep not accounted for', async () => {
		const badNextStep: string = chance.word({ length: 20 }) // should not be 'DONE'
		const username: string = chance.name()
		const password: string = chance.word()

		jest.mocked(signIn).mockResolvedValue({
			isSignedIn: false,
			nextStep: { signInStep: badNextStep },
		} as any)
		jest.spyOn(window, 'alert')

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToSignIn } = result.current

		expect(async() => await attemptToSignIn({ username, password })).rejects.toThrow(`UI flow is missing a step: ${badNextStep}. This is not your fault; please contact support.`)
	})

	it('should allow attempts to complete a new user', async () => {
		const password: string = chance.word()
		const userAttributes: UserAttributes = {
			family_name: chance.last(),
			given_name: chance.first(),
		}

		jest.mocked(confirmSignIn).mockResolvedValue({
			isSignedIn: true,
			nextStep: { signInStep: 'DONE' },
		} as any)

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToCompleteNewUser } = result.current

		await act(async() => await attemptToCompleteNewUser(password, userAttributes))

		expect(confirmSignIn).toHaveBeenCalledWith({
			challengeResponse: password,
			options: {
				userAttributes,
			},
		})
	})

	it('should handle any errors with attempts to sign in', async () => {
		const password: string = chance.word()
		const userAttributes: UserAttributes = {
			family_name: chance.last(),
			given_name: chance.first(),
		}

		const error: string = chance.paragraph()
		jest.mocked(confirmSignIn).mockRejectedValue(error)
		jest.spyOn(window, 'alert')

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToCompleteNewUser } = result.current

		expect(async() => await attemptToCompleteNewUser(password, userAttributes)).rejects.toThrow(error)
	})
})
