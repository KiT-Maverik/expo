import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

/* autoprefixer grid: autoplace */

const snippetIdle: SxProps<Theme> = {
    height: 200,
    overflow: 'auto',
    width: '100%',
    border: (theme) => `1px solid ${theme.palette.divider}`,
    borderRadius: 3,
    p: 3,
    whiteSpace: 'pre',
}

const snippetLoading: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const snippetReady: SxProps<Theme> = {
    height: 200,
}

const embedOptionTitle: SxProps<Theme> = {
    minWidth: '25%',
}

const embedOptionDescription: SxProps<Theme> = {
    width: '100%',
}

const radio: SxProps = {
    p: 0,
    mx: 2,
}

const radioLabel: SxProps = {
    alignItems: 'flex-start',
}

const container: SxProps<Theme> = {
    width: '80%',
    gap: 4,
}

const tab: SxProps<Theme> = {
    fontWeight: 'bold',
    textTransform: 'none',
}

const linkContainer: SxProps<Theme> = {
    borderRadius: 3,
    px: 3,
    py: 2,
    overflow: 'hidden',
    border: (theme) => `1px solid ${theme.palette.action.disabled}`,
    backgroundColor: (theme) => theme.palette.action.hover,
}

const linkItem: SxProps<Theme> = {
    display: 'inline-block',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
}

export default {
    container,
    inlineEmbed: {
        option: {
            title: embedOptionTitle,
            description: embedOptionDescription,
        },
        snippet: {
            idle: snippetIdle,
            loading: snippetLoading,
            ready: snippetReady,
        },
    },
    oEmbedLink: {
        container: linkContainer,
        item: linkItem,
    },
    tab,
    radio: {
        item: radio,
        label: radioLabel,
    },
}
