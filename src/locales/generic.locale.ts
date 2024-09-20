import { LANGUAGE } from 'App'

import { dates } from './global/dates.ts'
import { inputs } from './global/inputs.ts'
import { operations } from './global/operations'
import { messages } from './global/messages'

export const getGenericLocale = (language: LANGUAGE) =>
	({
		dates: dates[language],
		inputs: inputs[language],
		messages: messages[language],
		operations: operations[language],
	}) as const
