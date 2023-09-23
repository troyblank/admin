import { withSSRContext } from "aws-amplify"
import { GetServerSidePropsContext } from 'next'
import { UserType } from '../types'
import { getAuthenticationSession, isUserAuthenticated, SIGN_IN_PATH } from './'

export const getServerSidePropsOrRedirect: (serverSideContext: GetServerSidePropsContext) => Promise<{ props: { user: UserType | null } } | null> = async (serverSideContext: GetServerSidePropsContext) => {
	const { Auth } = withSSRContext(serverSideContext)
	let user: UserType | null = null

	const respondWithUnauthenticated = (): null => {
		const { res: response } = serverSideContext

		response.setHeader('location', SIGN_IN_PATH)
		response.statusCode = 302
		response.end()

		return null
	}

	try {
		user = await getAuthenticationSession(Auth)
	} catch(error) {
		respondWithUnauthenticated()
	}

	if (isUserAuthenticated(user)) {
		return { props: { user } }
	} else {
		respondWithUnauthenticated()
	}

	return { props: { user } }
}
