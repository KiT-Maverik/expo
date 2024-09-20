import { Box } from '@mui/material'

import { route } from 'App'
import { Content } from 'design/templates'

import style from './LayoutDetectorPage.styles.ts'

export const LayoutDetectorPage = () => {
	return (
		<Content title={route.hooks.layoutDetector.title}>
			<Box></Box>
		</Content>
	)
}
