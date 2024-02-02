import Chance from 'chance'
import { mockUser } from '../mocks'
import { User } from '../types'
import { getUserFromAmplify, SIGN_IN_PATH } from './'
import { getServerSidePropsOrRedirect } from './pages'

jest.mock('./')

describe('Pages Utils', () => {
	const chance = new Chance()

	it('should be able to get server side props', async() => {
		const writeHead = jest.fn()
		const expectedUser: User = mockUser()

		jest.mocked(getUserFromAmplify).mockResolvedValue(expectedUser)

		expect(await getServerSidePropsOrRedirect({ res: {
			writeHead,
			end: jest.fn(),
		} } as any)).toStrictEqual({
			props: { user: expectedUser },
		})
		expect(writeHead).not.toHaveBeenCalled()
	})

	it('should not get get server side props if getting the session fails', async() => {
		const writeHead = jest.fn()

		jest.spyOn(console, 'error').mockImplementation(() => {})
		jest.mocked(getUserFromAmplify).mockRejectedValue(new Error(chance.paragraph()))

		expect(await getServerSidePropsOrRedirect({ res: {
			writeHead,
			end: jest.fn(),
		} } as any)).toStrictEqual({
			props: { user: null },
		})
		expect(writeHead).toHaveBeenCalledWith(302, { Location: SIGN_IN_PATH })
	})
})
