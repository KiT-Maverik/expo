import React, { createContext, useMemo, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import {CvPage} from "design/pages";

import { ThemeProvider } from "./utilitary/ThemeProvider/ThemeProvider";
import { ToastProvider } from "./utilitary/ToastProvider/ToastProvider";
import { LOCALE } from "../constants";

interface AppSettings {
  locale: LOCALE;
  setLocale: (locale: LOCALE) => void;
}
export const AppSettings = createContext({} as AppSettings);

export const App = () => {
  const [locale, setLocale] = useState<LOCALE>(LOCALE.EN);

  const contextValue = useMemo<AppSettings>(
    () => ({
      locale,
      setLocale: (locale: LOCALE) => setLocale(locale),
    }),
    [locale],
  );

  return (
    <AppSettings.Provider value={contextValue}>
      <CssBaseline />
      <ThemeProvider>
        <ToastProvider>
          <CvPage />
        </ToastProvider>
      </ThemeProvider>
    </AppSettings.Provider>
  );
};
