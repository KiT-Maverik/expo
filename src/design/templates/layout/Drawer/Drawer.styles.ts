import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { DrawerSide } from "./Drawer.tsx";

const drawerWidth = 240;

const smoothTransitionMixin: SxProps<Theme> = {
  transition: (theme) =>
    theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
} as const;

const layoutMixin: {
  [key in DrawerSide]: (show: boolean) => SxProps<Theme>;
} = {
  left: (show) => ({
    ml: show ? 0 : `-${drawerWidth}px`,
    borderRight: (theme) => `1px solid ${theme.palette.divider}`,
    ...smoothTransitionMixin,
  }),
  right: (show) => ({
    mr: show ? 0 : `-${drawerWidth}px`,
    borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
    ...smoothTransitionMixin,
  }),
} as const;

const container: (show: boolean, side: DrawerSide) => SxProps<Theme> = (
  show,
  side,
) =>
  ({
    ...layoutMixin[side](show),
    width: "240px",
  }) as const;

export default {
  container,
};
