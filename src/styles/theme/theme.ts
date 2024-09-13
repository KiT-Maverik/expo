import { createTheme, PaletteMode } from "@mui/material/styles";

import * as components from "./components";
import { breakpoints } from "./breakpoints";
import { paletteLight } from "./paletteLight";
import { paletteDark } from "./paletteDark";
import { shape } from "./shape";
import { typography } from "./typography";

export const theme = (mode: PaletteMode) =>
  createTheme({
    breakpoints,
    components,
    palette: mode === "light" ? paletteLight : paletteDark,
    shape,
    spacing: 4,
    typography,
  });
