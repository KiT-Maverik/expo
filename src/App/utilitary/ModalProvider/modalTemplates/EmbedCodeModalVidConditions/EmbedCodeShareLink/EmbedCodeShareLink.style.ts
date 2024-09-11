import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const container: SxProps<Theme> = {
    borderRadius: 3,
    px: 3,
    py: 2,
    overflow: 'hidden',
    border: (theme) => `1px solid ${theme.palette.action.disabled}`,
    backgroundColor: (theme) => theme.palette.action.hover,
}

const link: SxProps<Theme> = {
    display: 'inline-block',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
}

export default {
    container,
    link,
}
