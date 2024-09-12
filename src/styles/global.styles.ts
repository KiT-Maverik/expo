import { Interpolation } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const globalStyles: Interpolation<Theme> = {
  "#root": {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
} as const;
