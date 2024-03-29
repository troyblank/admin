import { type GetServerSidePropsContext } from 'next'
import { type User } from '../types'
import { getUserFromAmplify, SIGN_IN_PATH } from './'

export const getServerSidePropsOrRedirect: (serverSideContext: GetServerSidePropsContext) => Promise<{ props: { user: User | null } } | null> = async (serverSideContext: GetServerSidePropsContext) => {
	let user: User | null = null

	const respondWithUnauthenticated = (): null => {
		const { res: response } = serverSideContext
		response.writeHead(302, { Location: SIGN_IN_PATH })
		response.end()

		return null
	}

	try {
		user = await getUserFromAmplify(serverSideContext)
	} catch(error) {
		respondWithUnauthenticated()
	}

	return { props: { user } }
}
