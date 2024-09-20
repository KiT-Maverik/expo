import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const container: SxProps<Theme> = {
    px: (theme) => theme.mixins.contentSpacingX.lg,
    backgroundColor: (theme) => theme.palette.background.footer,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}

export default {
    container,
}
