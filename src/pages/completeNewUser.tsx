import React, { Fragment } from 'react'
import { GetServerSidePropsContext } from 'next'
import { UserType } from '../types'
import { AuthProvider } from '../contexts'
import { getServerSidePropsOrRedirect } from '../utils'
import { CompleteNewUserForm } from '../components'

export const getServerSideProps = async (serverSideContext: GetServerSidePropsContext) => getServerSidePropsOrRedirect(serverSideContext)

export const CompleteNewUserPage = ({ user }: { user: UserType }) => (
	<AuthProvider user={user}>
		<Fragment>
			<CompleteNewUserForm />
		</Fragment>
	</AuthProvider>
)

export default CompleteNewUserPage
