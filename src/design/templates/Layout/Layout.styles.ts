import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

const main: SxProps<Theme> = { flexGrow: 1, display: "grid" } as const;

const loader: SxProps<Theme> = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
} as const;

export default {
  loader,
  main,
};
