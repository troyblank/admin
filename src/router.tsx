import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HOME_PATH, PROFILE_PATH, SIGN_IN_PATH } from './utils'
import { HomePage, ProfilePage, SignInPage } from './pages'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={SIGN_IN_PATH} element={<SignInPage />} />
				<Route path={PROFILE_PATH} element={<ProfilePage />} />
				<Route path={HOME_PATH} element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	)
}
