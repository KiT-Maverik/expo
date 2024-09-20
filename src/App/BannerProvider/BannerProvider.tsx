import { Box } from '@mui/material'
import { useMemo } from 'react'

import { DemoBanner } from './banners/DemoBanner/DemoBanner.tsx'

export const BannerProvider = () => {
    const content = useMemo(() => {
		const result = []

		if (true) result.push(<DemoBanner key="demoBanner" />)

		return result
	}, [])

	if (content.length === 0) return null

	return <Box>{content}</Box>
}
