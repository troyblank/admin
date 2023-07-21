import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelloWorld } from './components'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/'} element={<HelloWorld />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
