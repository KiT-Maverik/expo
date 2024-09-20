import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material'

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
