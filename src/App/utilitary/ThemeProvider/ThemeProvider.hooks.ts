import { useContext } from "react";
import { Context, ThemeContext } from "App/index";

export const useThemeProvider = (): ThemeContext => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "useThemeControls hook must be used within a Theme context",
    );
  }

  return context;
};
