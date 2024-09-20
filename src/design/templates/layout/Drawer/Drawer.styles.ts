import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { DrawerSide } from './Drawer.tsx'

const smoothTransitionMixin: SxProps<Theme> = {
    transition: (theme) =>
		theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
} as const

const layoutMixin: {
	[key in DrawerSide]: (show: boolean) => SxProps<Theme>
} = {
    left: (show) => ({
        ml: (theme) => (show ? 0 : `-${theme.mixins.drawer.left.width}`),
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        ...smoothTransitionMixin,
    }),
    right: (show) => ({
        mr: (theme) => (show ? 0 : `-${theme.mixins.drawer.left.width}`),
        borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
        ...smoothTransitionMixin,
    }),
} as const

const container: (show: boolean, side: DrawerSide) => SxProps<Theme> = (
    show,
    side,
) =>
	({
	    ...layoutMixin[side](show),
	    width: (theme) => theme.mixins.drawer.left.width,
	}) as const

export default {
    container,
}
