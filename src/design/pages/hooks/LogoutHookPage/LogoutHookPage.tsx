import { Box } from '@mui/material'

import { route } from 'App'
import { Content } from 'design/templates'

import style from './LogoutHookPage.styles.ts'

export const LogoutHookPage = () => {
	return (
		<Content title={route.hooks.logout.title}>
			<Box></Box>
		</Content>
	)
}
