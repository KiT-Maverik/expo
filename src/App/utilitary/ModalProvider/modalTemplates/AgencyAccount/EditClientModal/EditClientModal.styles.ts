import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

const avatarDimensions = {
    height: 80,
    width: 80,
} as const

const container: SxProps<Theme> = {}

const avatarContainer: SxProps<Theme> = {
    position: 'relative',
    ...avatarDimensions,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',

    ...avatarDimensions,

    borderRadius: '50%',

    background: grey[400],
    backgroundSize: 'cover',
}

const avatarInput: SxProps<Theme> = {
    position: 'absolute',
    inset: 0,
    opacity: 0,
}

const avatarOverlay: SxProps<Theme> = {
    ...avatarDimensions,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: (theme) => theme.palette.action.active,
}

export default {
    container,
    avatar: {
        container: avatarContainer,
        input: avatarInput,
        overlay: avatarOverlay,
    },
}
