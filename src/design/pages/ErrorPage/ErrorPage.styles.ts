import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const container: SxProps<Theme> = {
	alignSelf: 'center',
	justifySelf: 'center',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 5,
} as const

const icon: SxProps<Theme> = {
	fill: (theme) => theme.palette.error.light,
	fontSize: 72,
} as const

export default {
	container,
	icon,
}
