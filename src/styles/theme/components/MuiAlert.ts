import { Components, Theme, typographyClasses, AlertColor, CSSInterpolation } from '@mui/material'

type ColorOptions = { [key in AlertColor]: string }

interface ColorSchema {
	text: ColorOptions
	background: ColorOptions
}

const area = {
	icon: 'icon',
	message: 'message',
	action: 'action',
} as const

export const MuiAlert: Components<Omit<Theme, 'components'>>['MuiAlert'] = {
	styleOverrides: (() => {
		const colorSchema: ColorSchema = {
			text: {
				info: '#014361',
				warning: '#663C00',
				success: '#1E4620',
				error: '#5F2120',
			},
			background: {
				info: '#E5EDFD',
				warning: '#FFF4E5',
				success: '#EDF7ED',
				error: '#FDEDED',
			},
		}

		const bannerMixin: CSSInterpolation = {
			border: 'none',
			borderRadius: 0,
			width: '100%',
		}

		return {
			root: ({
				theme: { breakpoints, mixins, palette, shape, spacing },
				ownerState: { severity, variant, mode },
			}) => ({
				display: 'grid',
				gridTemplateColumns: '22px 1fr auto',
				gridTemplateAreas: `"${area.icon} ${area.message} ${area.action}"`,
				gap: spacing(3),
				alignItems: 'center',

				borderRadius: shape.borderRadius * 3,
				border: `1px solid ${palette?.[severity as AlertColor].main}`,
				borderBottom: mode === 'banner' ? `1px solid ${palette?.[severity as AlertColor].main}` : '',

				backgroundColor: (() => {
					if (variant === 'filled') return palette?.[severity as AlertColor].main
					if (variant === 'standard') return colorSchema.background[severity as AlertColor]
				})(),

				...(mode === 'banner'
					? {
							...bannerMixin,
							paddingLeft: spacing(mixins.contentSpacingX.sm),
							paddingRight: spacing(mixins.contentSpacingX.sm),

							[breakpoints.up('tablet')]: {
								paddingLeft: spacing(mixins.contentSpacingX.lg),
								paddingRight: spacing(mixins.contentSpacingX.lg),
							},
						}
					: {}),

				[breakpoints.down('laptop')]: {
					gridTemplateColumns: '22px auto',
					gridTemplateAreas: `
                        "${area.icon} ${area.message}"
                        "${area.action} ${area.action}"
                    `,
				},
			}),
			icon: ({ theme: { palette }, ownerState: { severity, variant } }) => ({
				gridArea: area.icon,
				margin: 0,
				padding: 0,
				svg: {
					color: variant === 'filled' ? palette.common.white : palette?.[severity as AlertColor].main,
				},
			}),
			message: ({ theme, ownerState: { severity, variant, isBanner } }) => {
				const color =
					variant === 'filled' ? theme.palette.common.white : colorSchema.text[severity as AlertColor]

				return {
					gridArea: area.message,
					color,
					flexGrow: 1,
					[`.${typographyClasses.root}`]: {
						color,
					},
					maxWidth: isBanner ? 'initial' : 500,
					padding: 0,
				}
			},
			action: ({ theme }) => ({
				gridArea: area.action,

				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'end',
				gap: theme.spacing(2),

				margin: 0,
				padding: 0,

				[theme.breakpoints.down('laptop')]: {
					justifySelf: 'end',
				},
			}),
		}
	})(),
}
