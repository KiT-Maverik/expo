import { useEffect, useState } from 'react'

/**
 * A custom React hook that provides the current width and height of the browser viewport.
 *
 * This hook initializes the viewport dimensions to zero and sets up an event listener for window
 * resize events. On each resize event, the viewport dimensions are updated with the current width
 * and height of the window.
 */
export const useViewport = () => {
	const [viewport, setViewport] = useState({
		width: 0,
		height: 0,
	})

	useEffect(() => {
		const handleResize = () => {
			setViewport({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		window.addEventListener('resize', handleResize)

		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return { ...viewport }
}
