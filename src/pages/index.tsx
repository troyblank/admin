import React, { Fragment } from 'react'
import { GetServerSidePropsContext } from 'next'
import { UserType } from '../types'
import { AuthProvider } from '../contexts'
import { ProfileGreeting, TokenBox } from '../components'
import { getServerSidePropsOrRedirect } from '../utils'

export const getServerSideProps: any = async (serverSideContext: GetServerSidePropsContext) => getServerSidePropsOrRedirect(serverSideContext)

export const HomePage = ({ user }: { user: UserType }) => (
	<AuthProvider user={user}>
		<Fragment>
			<ProfileGreeting />
			<TokenBox />
		</Fragment>
	</AuthProvider>
)

export default HomePage
