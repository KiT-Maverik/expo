import { Box } from '@mui/material'

import { route } from 'App'
import { Content } from 'design/templates'

import style from './LoginHookPage.styles.ts'

export const LoginHookPage = () => {
	return (
		<Content title={route.hooks.login.title}>
			<Box></Box>
		</Content>
	)
}
