import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

const drawerWidth = 240;

const main: SxProps<Theme> = { flexGrow: 1, display: "grid" } as const;

const loader: SxProps<Theme> = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
} as const;

const drawer: {
  container: (offset: number) => SxProps<Theme>;
  header: SxProps<Theme>;
} = {
  container: (offset) => ({
    width: drawerWidth,
    top: offset - 1,
  }),
  header: (theme) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }),
} as const;

export default {
  drawer,
  loader,
  main,
};
