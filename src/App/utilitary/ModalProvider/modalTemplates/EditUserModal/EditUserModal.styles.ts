import { SxProps, Theme } from '@mui/material'

const area = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    permissions: 'permissions',
} as const

const container: SxProps<Theme> = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 4,
    gridTemplateAreas: `
        '${area.firstName} ${area.lastName}'
        '${area.email} ${area.email}'
        '${area.permissions} ${area.permissions}'
    `,
}

const firstName: SxProps = { gridArea: area.firstName }

const lastName: SxProps = { gridArea: area.lastName }

const email: SxProps = { gridArea: area.email }

const permissionsContainer: SxProps = {
    display: 'grid',
    gridArea: area.permissions,
    gridTemplateColumns: '1fr 1fr',
    gap: 2,
}

const permissionsTitle: SxProps = {
    gridColumn: 'span 2',
    textAlign: 'left',
    mb: 2,
}

const divider: SxProps = {
    width: 'calc(100% + 48px)',
    mx: -6,
    my: -2,
}

export default {
    grid: {
        container,
        firstName,
        lastName,
        email,
        permissions: {
            container: permissionsContainer,
            title: permissionsTitle,
        },
    },
    divider,
}
