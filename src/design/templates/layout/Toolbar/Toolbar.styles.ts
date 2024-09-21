import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const appBar: { container: SxProps<Theme>; menu: SxProps<Theme>; spaceReserve: SxProps<Theme> } = {
	container: {
		position: 'static',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 3,
	},
	menu: {
		display: 'flex',
		flexShrink: 0,
		gap: 3,
		width: (theme) => theme.mixins.drawer.left.width,
		pl: (theme) => theme.mixins.contentSpacingX.lg,
		textAlign: 'left',
		alignItems: 'center',
		minHeight: (theme) => theme.mixins.toolbar,

		':hover': {
			backgroundColor: (theme) => theme.palette.action.disabledBackground,
		},
	},
	spaceReserve: {
		width: '100%',
		maxWidth: (theme) => theme.mixins.drawer.left.width,
		height: (theme) => theme.mixins.toolbar,
		flexShrink: 10,
	},
} as const

const toolbar: {
	container: SxProps<Theme>
	loader: SxProps<Theme>
} = {
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		flexShrink: 1,
	},
	loader: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
	},
} as const

export default {
	appBar,
	toolbar,
}
