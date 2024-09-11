import { SxProps, Theme } from '@mui/material'
import { font } from 'styles/theme/typography'

const content: SxProps<Theme> = {}

const embedCode: { [key: string]: SxProps<Theme> } = {
    alert: {
        backgroundColor: (theme) => theme.palette.action.selected,
        borderRadius: 1,
        pt: 4,
        px: 4,
        pb: 5,
        mb: 5,
    },
    field: {
        mb: 4,
    },
    subtitle: {
        fontFamily: font.inter.semibold,
        mb: 2,
    },
    textarea: {
        width: '100%',
        minHeight: 150,
        fontFamily: 'inherit',
        fontSize: 12,
        lineHeight: 'inherit',
        border: (theme) => `1px solid ${theme.palette.action.focus}`,
        p: 1,
        resize: 'none',
        overflow: 'auto',
        msWordWrap: 'normal',
        wordWrap: 'normal',
        whiteSpace: 'pre',
    },
}

const copied: SxProps<Theme> = {
    color: (theme) => theme.palette.primary.main,
    ml: 5,
}

export default {
    content,
    copied,
    embedCode,
}
