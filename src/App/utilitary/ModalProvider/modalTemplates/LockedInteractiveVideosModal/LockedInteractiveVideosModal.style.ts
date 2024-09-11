import { SxProps, Theme } from '@mui/material'
import { font } from 'styles/theme/typography'

const modal: SxProps<Theme> = (theme: Theme) => ({
    position: 'absolute',
    zIndex: theme.zIndex.appBar,

    [theme.breakpoints.only('mobile')]: {
        zIndex: theme.zIndex.modal,
    },
})

const container: SxProps<Theme> = {
    maxWidth: 1200,
}

const title = (theme: Theme) => ({
    fontFamily: font.inter.bold,
    mt: 4,
    mb: 2,
    px: 16,
    textAlign: 'center',

    [theme.breakpoints.down('tablet')]: {
        px: 0,
    },
})

const titleImage: SxProps<Theme> = {
    mr: 4,
}

const description = (theme: Theme) => ({
    fontFamily: font.openSans.light,
    mb: 8,
    px: 20,
    textAlign: 'center',

    [theme.breakpoints.down('tablet')]: {
        px: 0,
    },
})

const promoContainer = (theme: Theme) => ({
    px: 40,

    [theme.breakpoints.down('desktop')]: {
        px: 10,
    },
})

const featuresTitle: SxProps<Theme> = {
    mb: 4,
    fontFamily: font.inter.semibold,
}

const featuresList = (theme: Theme) => ({
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    p: 0,

    [theme.breakpoints.down('tablet')]: {
        alignItems: 'initial',
        flexDirection: 'column',
    },
})

const featuresListItem: SxProps<Theme> = {
    p: 0,
    pb: 1,

    '&:not(:last-child)': {
        mb: 2,
    },
}

const featuresListImage: SxProps<Theme> = {
    height: 20,
    width: 20,
}

const featuresListText: SxProps<Theme> = {
    color: (theme) => theme.palette.primary.main,
    fontFamily: font.inter.semibold,
    ml: 2,
}

const ctaRoot = (theme: Theme) => ({
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: 1,
    px: 6,
    py: 3,
    mt: 8,
    background: theme.palette.background.default,

    [theme.breakpoints.down('laptop')]: {
        flexDirection: 'column',
    },
})

const ctaDescription = (theme: Theme) => ({
    px: 5,
    py: 2,

    [theme.breakpoints.down('laptop')]: {
        textAlign: 'center',
        p: 0,
    },
})

const ctaTitle: SxProps<Theme> = {
    fontFamily: font.inter.semibold,
}

const ctaButton = (theme: Theme) => ({
    px: 5,
    py: 2,

    [theme.breakpoints.down('laptop')]: {
        mt: 2,

        width: '100%',
        px: 2,
        py: 1,
    },
})

const awardsRoot = (theme: Theme) => ({
    mt: 8,
    gap: 6,

    [theme.breakpoints.down('tablet')]: {
        flexDirection: 'column',
    },
})

const awardsAvatar: SxProps<Theme> = {
    width: 72,
    height: 72,
}

const quoteRoot: SxProps<Theme> = {
    display: 'grid',
    gap: 3,
}

const quoteName: SxProps<Theme> = {
    fontFamily: font.inter.semibold,
}

const clientImage: SxProps<Theme> = {
    mx: '-2px',
    objectFit: 'contain',
}

const clientsContainer: SxProps<Theme> = {
    mt: 13,
    textAlign: 'center',
}

const clientsText: SxProps<Theme> = {
    fontFamily: font.inter.semibold,
}

export default {
    modal,
    container,
    title,
    titleImage,
    description,
    promoContainer,
    features: {
        title: featuresTitle,
        list: featuresList,
        listItem: {
            root: featuresListItem,
            image: featuresListImage,
            text: featuresListText,
        },
    },
    cta: {
        root: ctaRoot,
        description: ctaDescription,
        button: ctaButton,
        title: ctaTitle,
    },
    awards: {
        root: awardsRoot,
        avatar: awardsAvatar,
    },
    quote: {
        root: quoteRoot,
        name: quoteName,
    },
    clients: {
        image: clientImage,
        container: clientsContainer,
        text: clientsText,
    },
}
