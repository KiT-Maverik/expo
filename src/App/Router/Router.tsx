import { BrowserRouter, Routes, Route } from 'react-router-dom'

import {
	CopyToClipboardPage,
	CountdownPage,
	HomePage,
	LayoutDetectorPage,
	LoginHookPage,
	LogoutHookPage,
	NotFoundPage,
	PasswordValidatorPage,
	ViewportDetectorPage,
} from 'design/pages'

import { route } from '../variables/routes.contants'
import { Layout } from '../Layout/Layout'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={route.home.href} element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path={route.hooks.copyToClipboard.href} element={<CopyToClipboardPage />} />
					<Route path={route.hooks.countdown.href} element={<CountdownPage />} />
					<Route path={route.hooks.layoutDetector.href} element={<LayoutDetectorPage />} />
					<Route path={route.hooks.login.href} element={<LoginHookPage />} />
					<Route path={route.hooks.logout.href} element={<LogoutHookPage />} />
					<Route path={route.hooks.passwordValidator.href} element={<PasswordValidatorPage />} />
					<Route path={route.hooks.viewportDetector.href} element={<ViewportDetectorPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
