import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

const drawerWidth = 240;

const smoothChangeMixin: (prop: string) => SxProps<Theme> = (prop) =>
  ({
    transition: (theme) =>
      theme.transitions.create(prop, {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
  }) as const;

const contentArea: (
  offsetLeft: boolean,
  offsetRight: boolean,
) => SxProps<Theme> = (offsetLeft, offsetRight) =>
  ({
    flexGrow: 1,
    display: "grid",
    gridTemplateRows: (theme) =>
      `${theme.mixins.toolbar.minHeight}px auto ${theme.mixins.toolbar.minHeight}px `,
    ...smoothChangeMixin("margin"),
    marginLeft: offsetLeft ? `${drawerWidth}px` : 0,
    marginRight: offsetRight ? `${drawerWidth}px` : 0,
  }) as const;

const main: SxProps<Theme> = {} as const;

const appBar: (offsetLeft: boolean, offsetRight: boolean) => SxProps<Theme> = (
  offsetLeft,
  offsetRight,
) =>
  ({
    position: "relative",
    width: "auto",
    ...smoothChangeMixin("margin"),
    pl: !offsetLeft ? `${drawerWidth}px` : 0,
    marginLeft: offsetLeft ? `${drawerWidth}px` : 0,
    marginRight: offsetRight ? `${drawerWidth}px` : 0,
  }) as const;

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

const menuButton: (
  offsetTop: number,
  leftDrawerShown: boolean,
) => SxProps<Theme> = (offsetTop, leftDrawerShown) => ({
  display: "flex",
  gap: 3,
  width: `${drawerWidth}px`,
  pl: (theme) => theme.mixins.contentSpacingX.lg,
  textAlign: "left",
  height: (theme) => theme.mixins.toolbar.height,
  color: (theme) => (leftDrawerShown ? theme.palette.text.primary : "white"),
  position: "absolute",
  top: offsetTop - 1,
  zIndex: 10000,
  alignItems: "center",
  minHeight: (theme) => theme.mixins.toolbar,

  ":hover": {
    backgroundColor: (theme) => theme.palette.action.disabledBackground,
  },
});

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

export const footer: SxProps<Theme> = {
  px: (theme) => theme.mixins.contentSpacingX.lg,
  backgroundColor: (theme) => theme.palette.background.footer,
};

export default {
  contentArea,
  footer,
  drawer,
  appBar,
  toolbar,
  menuButton,
  main,
};
