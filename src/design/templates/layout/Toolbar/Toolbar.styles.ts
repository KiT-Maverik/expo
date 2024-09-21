import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const appBar: { container: SxProps<Theme>; spaceReserve: SxProps<Theme>; menu: SxProps<Theme> } = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 3,
	},
	spaceReserve: {
		width: '100%',
		maxWidth: (theme) => theme.mixins.drawer.left.width,
		height: (theme) => theme.mixins.toolbar,
		flexShrink: 1,
	},
	menu: {
		display: 'flex',
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
} as const

const toolbar: {
	container: SxProps<Theme>
	loader: SxProps<Theme>
} = {
	container: {
		display: 'flex',
		justifyContent: 'space-between',
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
