import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

const drawerWidth = 240;

const smoothMarginChangeMixin: SxProps<Theme> = {
  transition: (theme) =>
    theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
};

const main: (offsetLeft: boolean, offsetRight: boolean) => SxProps<Theme> = (
  offsetLeft,
  offsetRight,
) =>
  ({
    flexGrow: 1,
    display: "grid",
    ...smoothMarginChangeMixin,
    marginLeft: offsetLeft ? `${drawerWidth}px` : 0,
    marginRight: offsetRight ? `${drawerWidth}px` : 0,
  }) as const;

const appBar: (offsetLeft: boolean, offsetRight: boolean) => SxProps<Theme> = (
  offsetLeft,
  offsetRight,
) =>
  ({
    position: "relative",
    width: "auto",
    ...smoothMarginChangeMixin,
    marginLeft: offsetLeft ? `${drawerWidth}px` : 0,
    marginRight: offsetRight ? `${drawerWidth}px` : 0,
  }) as const;

const toolbar: {
  container: SxProps<Theme>;
  loader: SxProps<Theme>;
} = {
  container: {
    display: "flex",
    justifyContent: "end",
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
} as const;

const menuButton: {
  button: SxProps<Theme>;
  container: (offset: number) => SxProps<Theme>;
} = {
  button: {
    display: "flex",
    alignItems: "center",
    gap: 3,
  },
  container: (offset) => ({
    position: "absolute",
    top: offset - 1,
    zIndex: 10000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: drawerWidth,
    minHeight: (theme) => theme.mixins.toolbar,
  }),
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
  appBar,
  toolbar,
  menuButton,
  main,
};
