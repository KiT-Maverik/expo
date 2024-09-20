import { useCallback } from 'react'
import { useToast } from 'App'

/**
 * Custom hook that provides functionality to copy text to the clipboard.
 *
 * This hook utilizes the browser's clipboard API to copy text safely within a secure context.
 * It also integrates with the toast notification system to display success or error messages
 * based on the operation outcome. The messages used for the toast notifications are fetched
 * from the locale context.
 */
export const useCopyToClipboard = () => {
	const { showToast } = useToast()

	const copy = useCallback((text: string) => {
		if (window.isSecureContext) {
			navigator.clipboard
				.writeText(text)
				.then(() => showToast({ type: 'success', message: 'Copied to clipboard' }))
				.catch(() => showToast({ type: 'error', message: 'Something went wrong' }))
		} else {
			console.error('The context is NOT secure')
		}
	}, [])

	return { copy }
}
