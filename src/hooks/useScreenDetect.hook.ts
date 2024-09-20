// MODULES
import { useCallback, useEffect, useState } from 'react'

// RESOURCES
import { breakpoint } from 'src/variables/layout.variables'

export function useScreenDetect() {
	const initialState = {
		isPhone: false,
		isTablet: false,
		isDesktop: false,
		isOversized: false,
	}
	const [screenType, setScreenType] = useState(initialState)

	const detectScreen = useCallback(() => {
		setScreenType({
			isPhone: window.matchMedia(`(max-width: ${breakpoint.tablet - 1}px)`).matches,
			isTablet:
				window.matchMedia(`(min-width: ${breakpoint.tablet}px)`).matches &&
				window.matchMedia(`(max-width: ${breakpoint.desktop - 1}px)`).matches,
			isDesktop: window.matchMedia(`(min-width: ${breakpoint.desktop}px)`).matches,
			isOversized: window.matchMedia(`(min-width: ${breakpoint.maxWidth + 1}px)`).matches,
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
