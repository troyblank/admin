import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CHANGE_PASSWORD_PATH, HOME_PATH, SIGN_IN_PATH } from './utils'
import { ChangePasswordPage, HomePage, SignInPage } from './pages'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={SIGN_IN_PATH} element={<SignInPage />} />
				<Route path={CHANGE_PASSWORD_PATH} element={<ChangePasswordPage />} />
				<Route path={HOME_PATH} element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
