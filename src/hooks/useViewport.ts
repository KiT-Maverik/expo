import { useEffect, useState } from 'react'

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
