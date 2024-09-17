import { createContext, useMemo } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider as StoreProvider } from "react-redux";
import { CssBaseline, GlobalStyles } from "@mui/material";

import { globalStyles } from "styles";

import { ThemeProvider } from "./ThemeProvider/ThemeProvider";
import { ToastProvider } from "./ToastProvider/ToastProvider";
import { ModalProvider } from "./ModalProvider/ModalProvider.tsx";
import { Router } from "./Router/Router";
import { appStore } from "./App.store.ts";

interface AppSettings {
  sample: string;
}
export const AppSettings = createContext({} as AppSettings);

export const App = () => {
  const appSettings = useMemo<AppSettings>(() => ({ sample: "sample" }), []);

  return (
    <AppSettings.Provider value={appSettings}>
      <StoreProvider store={appStore}>
        <CssBaseline />
        <ThemeProvider>
          <GlobalStyles styles={globalStyles} />
          <ToastProvider>
            <Router />
          </ToastProvider>
          <ModalProvider />
        </ThemeProvider>
      </StoreProvider>
    </AppSettings.Provider>
  );
};
