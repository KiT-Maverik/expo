import { PaletteColorOptions } from "@mui/material";
import { ThemeShape } from "styles/theme/shape";

declare module "@mui/material/styles" {
  export interface Theme {
    shape: ThemeShape;
  }

  export interface ThemeOptions {
    shape?: ThemeShape;
  }

  interface CommonColors {
    tertiaryOutlinedBorder?: string;
  }

  interface Mixins {
    contentSpacingX: {
      lg: number;
      sm: number;
    };
  }

  interface TypeBackground {
    surface: string;
    accent: string;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    accent?: PaletteColorOptions;
  }
  interface Palette {
    tertiary: Palette["primary"];
    accent: Palette["primary"];
  }

  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
    fullWidth: true;
  }
}

declare module "@mui/material/Alert" {
  interface AlertProps {
    mode?: "alert" | "banner";
  }
}
