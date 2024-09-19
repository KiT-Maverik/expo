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

const contentArea: SxProps<Theme> = {
  flexGrow: 1,
  display: "grid",
  gridTemplateRows: (theme) =>
    `${theme.mixins.toolbar.minHeight}px auto ${theme.mixins.toolbar.minHeight}px `,
} as const;

const main: SxProps<Theme> = {
  display: "flex",
  overflowX: "hidden",
  flexGrow: 1,
} as const;

const appBar: SxProps<Theme> = {
  position: "relative",
  width: "auto",
  ...smoothChangeMixin("padding"),
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
  contentArea,
  footer,
  appBar,
  toolbar,
  menuButton,
  main,
};
