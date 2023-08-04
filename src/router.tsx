import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
	HOME_PATH,
	COMPLETE_USER_PATH,
	SIGN_IN_PATH,
} from './utils'
import {
	HomePage,
	CompleteNewUserPage,
	SignInPage,
} from './pages'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={SIGN_IN_PATH} element={<SignInPage />} />
				<Route path={COMPLETE_USER_PATH} element={<CompleteNewUserPage />} />
				<Route path={HOME_PATH} element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	)
}
