import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const background: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    direction: 'column',
}

const container: SxProps<Theme> = (theme: Theme) => ({
    width: 1,
    minHeight: 220,
    maxHeight: (theme) => `calc(100vh - ${theme.spacing(6)})`,
    outline: 'none',
    overflow: 'auto',
    backgroundColor: (theme) => theme.palette.background.paper,
    p: 6,
    mx: 6,
    borderRadius: 5,

    [theme.breakpoints.only('mobile')]: {
        maxHeight: (theme) => `calc(100vh - ${theme.spacing(16)})`,
    },
})

const containerFullWidth: SxProps<Theme> = {
    maxWidth: '100vw',
    margin: (theme) => `0 ${theme.spacing(6)}`,
}

const modalHeader: (hasTitle: boolean, hasNodeTitle: boolean) => SxProps<Theme> = (hasTitle, hasNodeTitle) => ({
    display: 'flex',
    justifyContent: hasTitle || hasNodeTitle ? 'space-between' : 'end',
    alignItems: 'start',
    gap: 4,
    userSelect: 'none',
})

const modalBody: SxProps<Theme> = {
    flexGrow: 1,
    position: 'relative',
    overflowY: 'auto',
    boxSizing: 'border-box',
    px: 6,
    mx: -6,
    py: '10px',
    my: '-10px',
}

const modalActions: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: 4,
}

export default {
    background,
    container,
    containerFullWidth,
    modal: {
        header: modalHeader,
        body: modalBody,
        actions: modalActions,
    },
}
