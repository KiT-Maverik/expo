import { SxProps, Theme } from '@mui/material'

const title: SxProps<Theme> = {
    gap: 2,
}

const content = (theme: Theme) => ({
    [theme.breakpoints.up('tablet')]: {
        minWidth: 530,
    },
})

const folderRoot: SxProps<Theme> = {
    flexGrow: 1,
    mb: 6,
}

const inputRoot: SxProps<Theme> = {
    flexGrow: 1,
    gap: 2,
    pr: 1,
    pt: 5,
}

const inputIcon: SxProps<Theme> = {
    pb: 1,
}

const folderIcon: SxProps<Theme> = {
    pt: 4,
    width: 80,
}

export default {
    title,
    content,
    folder: {
        root: folderRoot,
        icon: folderIcon,
        input: {
            root: inputRoot,
            icon: inputIcon,
        },
    },
}
