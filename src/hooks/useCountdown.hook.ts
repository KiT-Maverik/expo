// MODULES
import { useCallback, useEffect, useState } from 'react'

export interface ITimerValue {
	days: number
	hours: number
	minutes: number
	seconds: number
}

const timerInitialState: ITimerValue = {
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
}

/**
 * Custom hook that provides a countdown timer to a specified target date.
 */
export function useCountdown(target: string) {
	const [timer, setTimer] = useState<ITimerValue>(timerInitialState)
	const [isFinished, setFinished] = useState(false)
	const endDate = moment(target)

	const calculateTimeLeft = useCallback(() => {
		const diff = endDate.diff(moment())
		const duration = moment.duration(diff)
		const diffTime = {
			days: endDate.diff(moment(), 'days'),
			hours: duration.hours(),
			minutes: duration.minutes(),
			seconds: duration.seconds(),
		}
		setTimer(diffTime)
	}, [endDate])

	useEffect(() => {
		let interval: NodeJS.Timer

		if (moment().isBefore(endDate)) {
			interval = setInterval(calculateTimeLeft, 1000)
		} else {
			setFinished(true)
		}

		return () => interval && clearInterval(interval)
	}, [calculateTimeLeft, endDate])

	return { ...timer, isFinished }
}
