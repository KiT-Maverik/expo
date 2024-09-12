import { createContext, useMemo } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, GlobalStyles } from "@mui/material";

import { globalStyles } from "styles";

import { ThemeProvider } from "./utilitary/ThemeProvider/ThemeProvider";
import { ToastProvider } from "./utilitary/ToastProvider/ToastProvider";
import { Router } from "./utilitary/Router/Router";

interface AppSettings {
  sample: string;
}
export const AppSettings = createContext({} as AppSettings);

export const App = () => {
  const appSettings = useMemo<AppSettings>(() => ({ sample: "sample" }), []);

  return (
    <AppSettings.Provider value={appSettings}>
      <CssBaseline />
      <ThemeProvider>
        <GlobalStyles styles={globalStyles} />
        <Router />
        <ToastProvider>pew</ToastProvider>
      </ThemeProvider>
    </AppSettings.Provider>
  );
};
