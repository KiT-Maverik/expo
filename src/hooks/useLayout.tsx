import { useMediaQuery, useTheme } from '@mui/material'

/**
 * Custom hook to determine the current layout mode.
 */
export const useLayout = (strict = false) => {
	const theme = useTheme()

	return {
		isMobile: useMediaQuery(theme.breakpoints.down('tablet')),
		isTablet: strict
			? useMediaQuery(theme.breakpoints.between('tablet', 'laptop'))
			: useMediaQuery(theme.breakpoints.down('laptop')),
		isLaptop: strict
			? useMediaQuery(theme.breakpoints.between('laptop', 'desktop'))
			: useMediaQuery(theme.breakpoints.down('desktop')),
		isDesktop: strict
			? useMediaQuery(theme.breakpoints.between('desktop', 'fullWidth'))
			: useMediaQuery(theme.breakpoints.down('fullWidth')),
		isFullWidth: useMediaQuery(theme.breakpoints.up('fullWidth')),
	}
}

/*
=================================
===||Version for non MUI projects
=================================

import { useCallback, useEffect, useState } from 'react'

export function useLayout() {
	const initialState = {
		isPhone: false,
		isTablet: false,
		isDesktop: false,
		isOversized: false,
	}

	const [screenType, setScreenType] = useState(initialState)

	const detectScreen = useCallback(() => {
		setScreenType({
			isPhone: window.matchMedia(`(max-width: ${breakpoints.values.tablet - 1}px)`).matches,
			isTablet:
				window.matchMedia(`(min-width: ${breakpoints.values.tablet}px)`).matches &&
				window.matchMedia(`(max-width: ${breakpoints.values.desktop - 1}px)`).matches,
			isDesktop: window.matchMedia(`(min-width: ${breakpoints.values.desktop}px)`).matches,
			isOversized: window.matchMedia(`(min-width: ${breakpoints.values.fullWidth + 1}px)`).matches,
		})
	}, [])

	useEffect(() => {
		detectScreen()
		window.addEventListener('resize', detectScreen)

		return () => {
			window.removeEventListener('resize', detectScreen)
		}
	}, [detectScreen])

	return screenType
}
*/
