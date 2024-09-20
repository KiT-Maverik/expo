import { Box } from '@mui/material'

import { selectAppState, useAppSelector } from 'App'

import style from './Drawer.styles.ts'
import { Navigation } from './items/Navigation.tsx'

export type DrawerSide = 'left' | 'right'
export type DrawerItemsSet = 'navigation' | 'none'

interface DrawerProps {
	side: DrawerSide
	itemsSet?: DrawerItemsSet
}

export const Drawer = ({ side, itemsSet = 'none' }: DrawerProps) => {
	const { showLeftDrawer, showRightDrawer } = useAppSelector(selectAppState)

	return (
		<Box sx={style.container(side === 'left' ? showLeftDrawer : showRightDrawer, side)}>
			{itemsSet === 'navigation' && <Navigation />}
		</Box>
	)
}
