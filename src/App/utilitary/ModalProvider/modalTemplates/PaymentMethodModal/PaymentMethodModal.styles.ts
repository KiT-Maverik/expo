import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const adornment: SxProps<Theme> = {
    fill: (theme) => theme.palette.text.secondary,
    mr: 2,
}

const container = (theme: Theme) => ({
    display: 'grid',
    gap: 8,
    maxWidth: 550,

    [theme.breakpoints.up('laptop')]: {
        gridTemplateColumns: '1fr 1fr',
        maxWidth: 750,
    },
})

export default {
    container,
    adornment,
}
