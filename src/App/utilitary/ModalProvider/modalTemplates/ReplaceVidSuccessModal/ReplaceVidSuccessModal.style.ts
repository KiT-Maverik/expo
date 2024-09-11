import { SxProps, Theme } from '@mui/material'
import { font } from 'styles/theme/typography'

const container: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const title: SxProps<Theme> = {
    fontFamily: font.inter.semibold,
    textAlign: 'center',
    width: '100%',
}

const description: SxProps<Theme> = {
    gap: 2,
    mb: 6,
    textAlign: 'center',
}

export default {
    container,
    title,
    description,
}
