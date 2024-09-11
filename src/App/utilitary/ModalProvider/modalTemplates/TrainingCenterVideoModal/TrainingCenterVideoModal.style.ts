import { SxProps, Theme } from '@mui/material'

const container: SxProps<Theme> = {
    width: 'unset',
}

const description = (theme: Theme) => ({
    mb: 5,

    [theme.breakpoints.down('laptop')]: {
        mt: 0,
        mb: 4,
    },
})

const videoWrapper: SxProps<Theme> = {
    width: '80vw',
    height: 'calc((9 / 16) * 80vw)',
    maxWidth: 'calc((80vh - 100px) * (16 / 9))',
    maxHeight: 'calc(80vh - 100px)',
}

const video: SxProps = {
    pt: '56.25%',
    width: '100%',
}

const skeleton: SxProps = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
}

export default {
    video,
    videoWrapper,
    skeleton,
    container,
    description,
}
