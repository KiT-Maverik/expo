import { localStorageKey } from 'App'

export const useLogout = () => {
	localStorage.removeItem(localStorageKey.token)
}
