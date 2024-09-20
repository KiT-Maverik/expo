import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage, NotFoundPage, PasswordValidatorPage } from 'design/pages'

import { route } from '../variables/routes.contants'
import { Layout } from '../Layout/Layout'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={route.home.href} element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path={route.hooks.passwordValidator.href} element={<PasswordValidatorPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
