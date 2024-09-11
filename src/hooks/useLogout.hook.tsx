import { localStorageKey } from "constants";

export const useLogout = () => {
  localStorage.removeItem(localStorageKey.token);
};
