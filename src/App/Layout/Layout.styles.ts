import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

const drawerWidth = 240;

const main: SxProps<Theme> = {
  display: "flex",
  overflowX: "hidden",
  flexGrow: 1,
} as const;

const appBar: SxProps<Theme> = {
  position: "relative",
  width: "auto",
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

const menuButton: SxProps<Theme> = {
  display: "flex",
  gap: 3,
  width: `${drawerWidth}px`,
  pl: (theme) => theme.mixins.contentSpacingX.lg,
  textAlign: "left",
  position: "absolute",
  alignItems: "center",
  minHeight: (theme) => theme.mixins.toolbar,

  ":hover": {
    backgroundColor: (theme) => theme.palette.action.disabledBackground,
  },
};

export const footer: SxProps<Theme> = {
  px: (theme) => theme.mixins.contentSpacingX.lg,
  backgroundColor: (theme) => theme.palette.background.footer,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default {
  footer,
  appBar,
  toolbar,
  menuButton,
  main,
};
