import { Components, Theme } from '@mui/material'

export const MuiAlertTitle: Components<Omit<Theme, 'components'>>['MuiAlertTitle'] = {
	styleOverrides: (() => {
		return {
			root: ({ theme }) => ({
				fontWeight: 500,
				marginTop: 0,
				marginBottom: theme.spacing(1),
			}),
		}
	})(),
}
