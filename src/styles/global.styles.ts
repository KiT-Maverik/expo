import { Interpolation } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const globalStyles: Interpolation<Theme> = (theme) =>
  ({
    "#root": {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: theme.palette.background.surface,
    },
  }) as const;
