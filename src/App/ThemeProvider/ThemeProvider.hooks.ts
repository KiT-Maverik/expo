import { useContext } from 'react'
import { ThemeContext } from './ThemeProvider.tsx'

export const useThemeProvider = (): ThemeContext => {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('useThemeControls hook must be used within a Theme context')
	}

	return context
}
