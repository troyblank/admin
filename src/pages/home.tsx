import React from 'react'
import { SIGN_IN_PATH } from '../utils'
import { ProfileGreeting } from '../components'

export const HomePage = () => (
	<>
		<ProfileGreeting />
		<div>This is the home page, go to <a href={SIGN_IN_PATH}>here to sign in</a></div>
	</>
)
