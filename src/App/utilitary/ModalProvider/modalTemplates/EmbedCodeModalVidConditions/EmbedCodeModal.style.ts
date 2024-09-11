import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const radio: SxProps = {
    p: 0,
    mx: 2,
}

const label: SxProps = {
    alignItems: 'flex-start',
}

const container: SxProps<Theme> = {
    gap: 4,
}

const tab: SxProps<Theme> = {
    fontWeight: 'bold',
    textTransform: 'none',
}

export default {
    container,
    tab,
    radio,
    label,
}
