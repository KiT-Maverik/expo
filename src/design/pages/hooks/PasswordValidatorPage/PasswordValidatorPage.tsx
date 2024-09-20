import { Box } from '@mui/material'

import { route } from 'App'
import { Content } from 'design/templates'

import style from './PasswordValidatorPage.styles'

export const PasswordValidatorPage = () => {
	return (
		<Content title={route.hooks.passwordValidator.title}>
			<Box></Box>
		</Content>
	)
}
