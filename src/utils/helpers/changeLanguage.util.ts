import { LANGUAGE, localStorageKey } from 'App'
import i18n from 'i18next'

export const changeLanguage = (language: LANGUAGE) => {
	localStorage.setItem(localStorageKey.language, language)
	i18n.changeLanguage(language)
}
