import { SxProps, Theme } from '@mui/material'
import { font } from 'styles/theme/typography'

const modal: SxProps<Theme> = (theme: Theme) => ({
    position: 'absolute',
    zIndex: theme.zIndex.appBar,

    [theme.breakpoints.only('mobile')]: {
        zIndex: theme.zIndex.modal,
    },
})

const title: SxProps<Theme> = {
    fontFamily: font.inter.bold,
    mt: 4,
    mx: 0,
    mb: 2,
    textAlign: 'center',
}

const titleImage: SxProps<Theme> = {
    mr: 2,
    width: 24,
}

const description: SxProps<Theme> = {
    fontFamily: font.openSans.light,
    mt: 0,
    mx: 'auto',
    mb: 8,
    maxWidth: 660,
    textAlign: 'center',
}

const upgradeNowRoot: SxProps<Theme> = {
    border: (theme) => `1px solid ${theme.palette.text.primary}`,
    borderRadius: 2,
    px: 8,
    py: 4,
}

const upgradeNowRootLessMd: SxProps<Theme> = {
    p: 4,
}

const upgradeNowText: SxProps<Theme> = {
    flex: '1 1 auto',
    textAlign: 'left',
}

const upgradeNowTextLessSm: SxProps<Theme> = {
    flex: '0 0 100%',
    maxWidth: '100%',
    textAlign: 'center',
    mb: 4,
}

const upgradeNowTitle: SxProps<Theme> = {
    fontFamily: font.inter.bold,
    mb: 1,
}

const upgradeNowSkeletonLessSm: SxProps<Theme> = {
    mx: 'auto',
    my: 0,
}

const upgradeNowDescription: SxProps<Theme> = {
    fontFamily: font.openSans.light,
}

const upgradeNowActions: SxProps<Theme> = {
    flex: '0 0 206px',
    maxWidth: 206,
}

const upgradeNowActionsLessSm: SxProps<Theme> = {
    flex: '0 0 100%',
    maxWidth: '100%',
}

const upgradeNowButtonRoot: SxProps<Theme> = {
    fontFamily: font.inter.bold,
    p: 2,
    width: '100%',
}

const upgradeNowButtonImage: SxProps<Theme> = {
    mr: 1,
}

export default {
    modal,
    title,
    titleImage,
    description,
    upgradeNow: {
        root: upgradeNowRoot,
        rootLessMd: upgradeNowRootLessMd,
        text: upgradeNowText,
        textLessSm: upgradeNowTextLessSm,
        title: upgradeNowTitle,
        skeletonLessSm: upgradeNowSkeletonLessSm,
        description: upgradeNowDescription,
        actions: upgradeNowActions,
        actionsLessSm: upgradeNowActionsLessSm,
        button: {
            root: upgradeNowButtonRoot,
            image: upgradeNowButtonImage,
        },
    },
}
