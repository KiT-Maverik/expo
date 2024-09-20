import { SxProps, Theme } from '@mui/material'

const container: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
}

const layout: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
}

const spacing: SxProps<Theme> = (theme: Theme) => ({
	px: theme.mixins.contentSpacingX.sm,
	py: 5,

	[theme.breakpoints.up('tablet')]: {
		px: theme.mixins.contentSpacingX.lg,
	},
})

export default {
	container,
	layout,
	spacing,
}
