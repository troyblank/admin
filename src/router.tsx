import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChangePasswordPage, HomePage, SignInPage } from './pages'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/signin'} element={<SignInPage />} />
			</Routes>
			<Routes>
				<Route path={'/changePassword'} element={<ChangePasswordPage />} />
			</Routes>
			<Routes>
				<Route path={'/'} element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
