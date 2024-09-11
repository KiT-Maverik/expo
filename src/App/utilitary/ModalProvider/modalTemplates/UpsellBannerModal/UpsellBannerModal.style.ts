import { SxProps } from '@mui/material'

const modalRoot: SxProps = {
    textAlign: 'center',
    gap: 8,
    px: 8,
    py: 10,
}

const modalBody: SxProps = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 8,
}

const modalActions: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    gap: 3,
}

export default {
    modal: {
        root: modalRoot,
        body: modalBody,
        actions: modalActions,
    },
}
