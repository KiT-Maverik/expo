import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const wrapper: SxProps<Theme> = {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    mt: -10,
}

const container: SxProps<Theme> = {
    maxWidth: 500,
    gap: 4,
}

const invitationContainer: SxProps<Theme> = {
    display: 'flex',
    gap: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    border: ({ palette }) => `1px solid ${palette.divider}`,
    borderRadius: 3,
}

const invitationLink: SxProps<Theme> = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    ml: 4,
    color: ({ palette }) => palette.text.secondary,
}

export default {
    wrapper,
    container,
    invitation: {
        container: invitationContainer,
        link: invitationLink,
    },
}
