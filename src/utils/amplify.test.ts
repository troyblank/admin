import { getUserFromAmplify } from './amplify'

jest.mock('@aws-amplify/adapter-nextjs', () => ({
	...jest.requireActual('@aws-amplify/adapter-nextjs'),
	createServerRunner: jest.fn().mockReturnValue({
		runWithAmplifyServerContext: jest.fn(),
	}),
}))

describe('Amplify Utils', () => {

	it('should be able to get a user from a server context', async() => {
		expect(await getUserFromAmplify({ request: global.Request, response: global.Response} as any)).toBeNull()
	})
})
