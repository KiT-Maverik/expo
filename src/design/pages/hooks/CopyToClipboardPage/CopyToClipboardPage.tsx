import { Box } from '@mui/material'

import { route } from 'App'
import { Content } from 'design/templates'

import style from './CopyToClipboardPage.styles.ts'

export const CopyToClipboardPage = () => {
	return (
		<Content title={route.hooks.copyToClipboard.title}>
			<Box></Box>
		</Content>
	)
}
