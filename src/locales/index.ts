import { LANGUAGE } from 'App'
import { getGenericLocale } from './generic.locale.ts'

export const getLocale = (language: LANGUAGE) =>
	({
	    generic: getGenericLocale(language),
	}) as const
