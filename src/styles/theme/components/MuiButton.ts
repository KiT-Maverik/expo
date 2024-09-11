import { Components, Theme } from "@mui/material";

export const MuiButton: Components<Omit<Theme, "components">>["MuiButton"] = {
  styleOverrides: {
    root: {
      textTransform: "none",
      justifyContent: "start",
      px: 2,
    },
  },
};
