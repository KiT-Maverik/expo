import { SxProps, Theme } from '@mui/material'

const header: SxProps<Theme> = {
    position: 'absolute',
    zIndex: 1,
    right: 10,
    top: 10,
}

const modalStack: SxProps<Theme> = {
    position: 'relative',
    width: 1,
}

export default {
    header,
    modalStack,
}
