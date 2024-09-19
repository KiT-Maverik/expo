import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

const main: SxProps<Theme> = {
  display: "flex",
  overflowX: "hidden",
  flexGrow: 1,
} as const;

export default {
  toolbar,
  main,
};
