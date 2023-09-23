// import Chance from 'chance'
import { UserType } from '../types'
import { mockUser } from '../mocks'
import { getAuthenticationSession, isUserAuthenticated, SIGN_IN_PATH } from './'
import { getServerSidePropsOrRedirect } from './pages'

jest.mock('./')

describe('Pages Utils', () => {
	// 	const chance = new Chance()

	it('should be able to get server side props', async() => {
		const setHeader = jest.fn()
		const user: UserType = mockUser()

		jest.mocked(getAuthenticationSession).mockResolvedValue(user)
		jest.mocked(isUserAuthenticated).mockReturnValue(true)

		expect(await getServerSidePropsOrRedirect({ res: {
			setHeader,
			end: jest.fn(),
		} } as any)).toStrictEqual({
			props: { user },
		})
		expect(setHeader).not.toBeCalled()
	})

	it('should not get get server side props if the user is not valid', async() => {
		const setHeader = jest.fn()
		const user: UserType = mockUser()

		jest.mocked(getAuthenticationSession).mockResolvedValue(user)
		jest.mocked(isUserAuthenticated).mockReturnValue(false)

		expect(await getServerSidePropsOrRedirect({ res: {
			setHeader,
			end: jest.fn(),
		} } as any)).toStrictEqual({
			props: { user },
		})
		expect(setHeader).toBeCalledWith('location', SIGN_IN_PATH)
	})

	it('should not get get server side props if getting the session fails', async() => {
		const setHeader = jest.fn()
		const user: UserType = mockUser()

		jest.mocked(getAuthenticationSession).mockResolvedValue(user)
		jest.mocked(getAuthenticationSession).mockRejectedValue(null)

		expect(await getServerSidePropsOrRedirect({ res: {
			setHeader,
			end: jest.fn(),
		} } as any)).toStrictEqual({
			props: { user: null },
		})
		expect(setHeader).toBeCalledWith('location', SIGN_IN_PATH)
	})
})
