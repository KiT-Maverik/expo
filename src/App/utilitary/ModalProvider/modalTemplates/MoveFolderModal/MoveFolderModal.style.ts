import { SxProps, Theme } from '@mui/material'

const title: SxProps<Theme> = {
    gap: 2,
}

const content = (theme: Theme) => ({
    [theme.breakpoints.up('tablet')]: {
        minWidth: 530,
    },
})

const foldersTree: SxProps<Theme> = { height: 300, overflowY: 'auto', mt: 2 }

const listRoot: SxProps<Theme> = {
    ml: 6,
}

const listItemRoot: SxProps<Theme> = {
    '&:hover': {
        background: (theme) => theme.palette.action.hover,
    },
}

const listItemChild: SxProps<Theme> = {
    pl: 6,
}

const listItemSelected: SxProps<Theme> = {
    background: (theme) => theme.palette.action.selected,
}

export default {
    title,
    content,
    foldersTree,
    list: {
        root: listRoot,
        item: {
            root: listItemRoot,
            child: listItemChild,
            selected: listItemSelected,
        },
    },
}
