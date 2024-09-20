import { SxProps, switchClasses } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { blueGrey, yellow, grey } from '@mui/material/colors'

const container: SxProps<Theme> = {
	p: 0,
	overflow: 'visible',

	[`.${switchClasses.checked}`]: {
		[`+.${switchClasses.track}`]: {
			opacity: 1,
			backgroundColor: blueGrey['400'],
		},
	},

	[`.${switchClasses.switchBase}`]: {
		height: 1,
	},

	[`.${switchClasses.track}`]: {
		position: 'absolute',
		top: '50%',
		width: 'auto',
		left: 9,
		right: 9,
		transform: 'translateY(-50%)',
		opacity: 1,
		height: 24,
		borderRadius: 12,
		backgroundColor: blueGrey['700'],
	},
} as const

const icon: { moon: SxProps<Theme>; sun: SxProps<Theme> } = {
	moon: {
		fill: grey['100'],
		backgroundColor: blueGrey['700'],
		borderRadius: '50%',
	},
	sun: {
		fill: yellow['600'],
		backgroundColor: (theme) => theme.palette.common.white,
		borderRadius: '50%',
		padding: 0.5,
	},
}

export default {
	container,
	icon,
}
