import SunIcon from '@mui/icons-material/WbSunnyRounded'
import MoonIcon from '@mui/icons-material/DarkModeRounded'
import { Switch } from '@mui/material'

import style from './ThemeSwitch.styles'
import { useThemeProvider } from 'App/ThemeProvider/ThemeProvider.hooks.ts'

export const ThemeSwitch = () => {
	const { toggleThemeMode } = useThemeProvider()

    return (
        <Switch
            sx={style.container}
            onChange={toggleThemeMode}
            checkedIcon={<MoonIcon sx={style.icon.moon} />}
            icon={<SunIcon sx={style.icon.sun} />}
        />
	)
}
