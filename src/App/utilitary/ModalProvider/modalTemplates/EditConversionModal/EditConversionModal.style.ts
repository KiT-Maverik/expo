import { SxProps, Theme } from '@mui/material'

const formGroup = (theme: Theme) => ({
    display: 'flex',
    mb: 4,

    [theme.breakpoints.down('tablet')]: {
        flexWrap: 'wrap',
    },
})

const groupWithPadding: SxProps<Theme> = {
    pb: 0,
}

const formLabel = (theme: Theme) => ({
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 180px',
    pr: 1,
    gap: 1,

    [theme.breakpoints.down('tablet')]: {
        flex: '0 0 100%',
        pr: 0,
        pb: 1,
    },
})

const formHelpTooltip: SxProps<Theme> = {
    maxWidth: 230,
}

const formControl: SxProps<Theme> = {
    flex: '1 1 auto',
    maxWidth: 1,
}

const actions: SxProps<Theme> = {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'end',
    gap: 4,
}

export default {
    actions,
    form: {
        group: formGroup,
        groupWithPadding,
        label: formLabel,
        helpTooltip: formHelpTooltip,
        control: formControl,
    },
}
