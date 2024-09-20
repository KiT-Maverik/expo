import { localStorageKey } from 'App'

export const useLogin = () => {
	localStorage.removeItem(localStorageKey.token)
}
