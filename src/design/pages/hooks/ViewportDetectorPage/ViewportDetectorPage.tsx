import { Box } from '@mui/material'

import { route } from 'App'
import { Content } from 'design/templates'

import style from './ViewportDetectorPage.styles.ts'

export const ViewportDetectorPage = () => {
	return (
		<Content title={route.hooks.viewportDetector.title}>
			<Box></Box>
		</Content>
	)
}
