import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

const appBar: SxProps<Theme> = {
  position: "relative",
  width: "auto",
} as const;

const menuButton: SxProps<Theme> = {
  display: "flex",
  gap: 3,
  width: (theme) => theme.mixins.drawer.left.width,
  pl: (theme) => theme.mixins.contentSpacingX.lg,
  textAlign: "left",
  position: "absolute",
  alignItems: "center",
  minHeight: (theme) => theme.mixins.toolbar,

  ":hover": {
    backgroundColor: (theme) => theme.palette.action.disabledBackground,
  },
} as const;

const toolbar: {
  container: SxProps<Theme>;
  loader: SxProps<Theme>;
} = {
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
} as const;

const main: SxProps<Theme> = {
  display: "flex",
  overflowX: "hidden",
  flexGrow: 1,
} as const;

export default {
  appBar,
  toolbar,
  menuButton,
  main,
};
