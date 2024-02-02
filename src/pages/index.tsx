import React, { Fragment } from 'react'
import { GetServerSidePropsContext } from 'next'
import { type User } from '../types'
import { AuthProvider } from '../contexts'
import { ChangePasswordForm, ProfileGreeting, TokenBox } from '../components'
import { getServerSidePropsOrRedirect } from '../utils'

export const getServerSideProps = async (serverSideContext: GetServerSidePropsContext) => getServerSidePropsOrRedirect(serverSideContext)

export const HomePage = ({ user }: { user: User }) => (
	<AuthProvider user={user}>
		<Fragment>
			<ProfileGreeting />
			<ChangePasswordForm />
			<br /><br />
			<TokenBox />
		</Fragment>
	</AuthProvider>
)

export default HomePage
