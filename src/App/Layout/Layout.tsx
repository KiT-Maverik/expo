import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { BannerProvider } from 'App'
import { Footer, Drawer, Toolbar } from 'design/templates'

import style from './Layout.styles'

export const Layout = () => {
	return (
		<>
			<BannerProvider />

			<Toolbar />

			<Box component="main" sx={style.main}>
				<Drawer side="left" />
				{<Outlet />}
				<Drawer side="right" />
			</Box>

			<Footer />
		</>
	)
}
