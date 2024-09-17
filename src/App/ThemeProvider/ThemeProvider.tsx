import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { PaletteMode, ThemeProvider as MUI_ThemeProvider } from "@mui/material";
import { theme } from "styles";

export interface ThemeContext {
  theme: PaletteMode;
  toggleThemeMode: () => void;
}

export const Context = createContext({} as ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleThemeMode = useCallback(() => {
    setMode(mode === "light" ? "dark" : "light");
  }, [mode]);

  const contextValue = useMemo(
    () => ({
      toggleThemeMode,
      theme: mode,
    }),
    [mode],
  );

  return (
    <Context.Provider value={contextValue}>
      <MUI_ThemeProvider theme={theme(mode)}>{children}</MUI_ThemeProvider>
    </Context.Provider>
  );
};
