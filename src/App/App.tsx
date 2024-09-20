import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline, GlobalStyles } from '@mui/material'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { createContext, useMemo } from 'react'
import { Provider as StoreProvider } from 'react-redux'

import { globalStyles } from 'styles'

import { ThemeProvider } from './ThemeProvider/ThemeProvider'
import { ToastProvider } from './ToastProvider/ToastProvider'
import { ModalProvider } from './ModalProvider/ModalProvider.tsx'
import { Router } from './Router/Router'
import { appStore } from './App.store.ts'
import { LANGUAGE } from './variables/environment.constants.ts'
import { localStorageKey } from './variables/local-storage.constants.ts'
import { getLocale } from 'locales'

interface AppSettings {
	language: string
}
export const AppSettings = createContext({} as AppSettings)

export const App = () => {
	const appSettings = useMemo<AppSettings>(() => ({ language: 'sample' }), [])

	i18n.use(initReactI18next).init({
		resources: {
			[LANGUAGE.ENGLISH]: getLocale(LANGUAGE.ENGLISH),
			[LANGUAGE.UKRAINIAN]: getLocale(LANGUAGE.UKRAINIAN),
		},
		lng: (() => {
			const localeKey = localStorage.getItem(localStorageKey.language)

			if (!localeKey || !Object.values(LANGUAGE).includes(localeKey as LANGUAGE)) {
				localStorage.setItem(localStorageKey.language, LANGUAGE.ENGLISH)
				return LANGUAGE.ENGLISH
			} else return localeKey
		})(),
		fallbackLng: LANGUAGE.ENGLISH,

		interpolation: {
			escapeValue: false,
		},
	})

	return (
		<AppSettings.Provider value={appSettings}>
			<StoreProvider store={appStore}>
				<CssBaseline />
				<ThemeProvider>
					<GlobalStyles styles={globalStyles} />
					<ToastProvider>
						<Router />
					</ToastProvider>
					<ModalProvider />
				</ThemeProvider>
			</StoreProvider>
		</AppSettings.Provider>
	)
}
