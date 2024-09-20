import { addMinutes } from 'date-fns'

/**
 * Converts an ISO date string to a UTC date by adjusting for the local timezone offset.
 */
export const getUtcDateFromIso = (dateString: string) => {
	const date = new Date(dateString)
	const offset = date.getTimezoneOffset()
	return addMinutes(date, offset)
}
