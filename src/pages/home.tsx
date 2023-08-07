import React from 'react'
import { SIGN_IN_PATH } from '../utils'
import { ProfileGreeting, TokenBox } from '../components'

export const HomePage = () => (
	<>
		<ProfileGreeting />
		<TokenBox />
		<div>This is the home page, go to <a href={SIGN_IN_PATH}>here to sign in</a></div>
	</>
)
