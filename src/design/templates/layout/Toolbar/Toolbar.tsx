import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Button, ButtonBase, LinearProgress, Toolbar as Mui_Toolbar, Typography } from '@mui/material'
import { useMemo } from 'react'

import {
	closeLeftDrawer,
	closeRightDrawer,
	openLeftDrawer,
	openRightDrawer,
	projectName,
	selectAppState,
	useAppDispatch,
	useAppSelector,
} from 'App'
import { ThemeSwitch } from 'design/organisms'

import style from './Toolbar.styles.ts'

export const Toolbar = () => {
	const { showLoader, showLeftDrawer, showRightDrawer } = useAppSelector(selectAppState)
	const dispatch = useAppDispatch()

	const items = useMemo(() => {
		// Add conditional logic here to render various sets of content for various situations
		return (
			<>
				<Button
					color="inherit"
					onClick={() => (showLeftDrawer ? dispatch(closeLeftDrawer()) : dispatch(openLeftDrawer()))}
				>
					Toggle Left Drawer
				</Button>
				<Button
					color="inherit"
					onClick={() => (showRightDrawer ? dispatch(closeRightDrawer()) : dispatch(openRightDrawer()))}
				>
					Toggle Right Drawer
				</Button>
				<ThemeSwitch />
			</>
		)
	}, [showLeftDrawer, showRightDrawer])

	return (
		<AppBar sx={style.appBar.container}>
			<ButtonBase
				onClick={() => (showLeftDrawer ? dispatch(closeLeftDrawer()) : dispatch(openLeftDrawer()))}
				sx={style.appBar.menu}
			>
				<MenuIcon />
				<Typography variant="h6" component="div" flexGrow={1}>
					{projectName}
				</Typography>
			</ButtonBase>
			<Mui_Toolbar sx={style.toolbar.container}>{items}</Mui_Toolbar>
			<Box sx={style.appBar.spaceReserve} />
			{showLoader && <LinearProgress sx={style.toolbar.loader} />}
		</AppBar>
	)
}
