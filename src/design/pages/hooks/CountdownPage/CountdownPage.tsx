import { Box } from '@mui/material'

import { route } from 'App'
import { Content } from 'design/templates'

import style from './CountdownPage.styles.ts'

export const CountdownPage = () => {
	return (
		<Content title={route.hooks.countdown.title}>
			<Box></Box>
		</Content>
	)
}
