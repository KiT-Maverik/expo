import { Components, Theme } from '@mui/material'

export const MuiToolbar: Components<Omit<Theme, 'components'>>['MuiToolbar'] = {
	styleOverrides: (() => {
		return {
			root: ({ theme: { breakpoints, mixins, spacing } }) => ({
				gap: spacing(3),
				alignSelf: 'center',
				width: '100%',
				maxWidth: breakpoints.values.desktop,

				paddingLeft: spacing(mixins.contentSpacingX.sm),
				paddingRight: spacing(mixins.contentSpacingX.sm),

				[breakpoints.up('tablet')]: {
					paddingLeft: spacing(mixins.contentSpacingX.lg),
					paddingRight: spacing(mixins.contentSpacingX.lg),
				},
			}),
		}
	})(),
}
