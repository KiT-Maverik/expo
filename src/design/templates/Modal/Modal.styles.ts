import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

import { ModalLayout } from "./Modal.tsx";

const overlay: { [key in ModalLayout]: SxProps<Theme> } = {
  window: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    direction: "column",
  },
  fullscreen: {
    backgroundColor: (theme) => theme.palette.background.paper,
  },
} as const;

const modal: {
  actions: SxProps<Theme>;
  body: SxProps<Theme>;
  header: (hasTitle: boolean, hasNodeTitle: boolean) => SxProps<Theme>;
  layout: { [key in ModalLayout]: SxProps<Theme> };
} = {
  actions: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    gap: 4,
  },
  body: {
    flexGrow: 1,
    position: "relative",
    overflowY: "auto",
    boxSizing: "border-box",
    px: 6,
    mx: -6,
    py: "10px",
    my: "-10px",
  },
  header: (hasTitle, hasNodeTitle) => ({
    display: "flex",
    justifyContent: hasTitle || hasNodeTitle ? "space-between" : "end",
    alignItems: "start",
    gap: 4,
    userSelect: "none",
  }),
  layout: {
    window: (theme: Theme) => ({
      width: 1,
      minHeight: 220,
      maxHeight: (theme) => `calc(100vh - ${theme.spacing(6)})`,
      outline: "none",
      overflow: "auto",
      backgroundColor: (theme) => theme.palette.background.paper,
      p: 6,
      mx: 6,
      borderRadius: 5,

      [theme.breakpoints.only("mobile")]: {
        maxHeight: (theme) => `calc(100vh - ${theme.spacing(16)})`,
      },
    }),
    fullscreen: {
      maxWidth: "100vw",
      margin: (theme) => `0 ${theme.spacing(6)}`,
    },
  },
} as const;

export default {
  modal,
  overlay,
};
