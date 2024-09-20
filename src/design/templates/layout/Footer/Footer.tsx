import { Box } from '@mui/material'
import { useMemo } from 'react'

import style from './Footer.styles.ts'

export const Footer = () => {
	const items = useMemo(() => {
		// Add conditional logic here to render various sets of content for various situations
		return <>Footer</>
	}, [])

	return (
		<Box component="footer" sx={style.container}>
			{items}
		</Box>
	)
}
