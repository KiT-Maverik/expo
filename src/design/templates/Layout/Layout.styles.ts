import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

const main: SxProps<Theme> = { flexGrow: 1, display: "grid" } as const;

export default {
  main,
};
