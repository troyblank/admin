import { UserType } from '../types'
import { mockUser } from '../mocks'
import { getRefreshedAuthenticationSession, isUserAuthenticated, SIGN_IN_PATH } from './'
import { getServerSidePropsOrRedirect } from './pages'

jest.mock('./')

describe('Pages Utils', () => {

	it('should be able to get server side props', async() => {
		const setHeader = jest.fn()
		const user: UserType = mockUser()

		jest.mocked(getRefreshedAuthenticationSession).mockResolvedValue(user)
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

		jest.mocked(getRefreshedAuthenticationSession).mockResolvedValue(user)
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

		jest.mocked(getRefreshedAuthenticationSession).mockResolvedValue(user)
		jest.mocked(getRefreshedAuthenticationSession).mockRejectedValue(null)

		expect(await getServerSidePropsOrRedirect({ res: {
			setHeader,
			end: jest.fn(),
		} } as any)).toStrictEqual({
			props: { user: null },
		})
		expect(setHeader).toBeCalledWith('location', SIGN_IN_PATH)
	})
})
