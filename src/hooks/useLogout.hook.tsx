import { localStorageKey } from "variables";

export const useLogout = () => {
  localStorage.removeItem(localStorageKey.token);
};
