import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { modalClasses } from "@mui/material";

import { ModalLayout } from "./Modal.tsx";

const modalOverlayMixin: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
} as const;

const overlay: { [key in ModalLayout]: SxProps<Theme> } = {
  window: {
    ...modalOverlayMixin,
  },
  fullscreen: {
    ...modalOverlayMixin,

    [`.${modalClasses.backdrop}`]: {
      backgroundColor: (theme) => theme.palette.background.paper,
    },
  },
} as const;

const modalLayoutMixin: SxProps<Theme> = {
  width: 1,
  minHeight: 220,
  outline: "none",
  gap: 5,
  overflow: "auto",
  backgroundColor: (theme) => theme.palette.background.paper,
  p: 6,
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
      ...modalLayoutMixin,
      maxHeight: (theme) => `calc(100vh - ${theme.spacing(6)})`,
      mx: 6,
      borderRadius: 5,

      [theme.breakpoints.only("mobile")]: {
        maxHeight: (theme) => `calc(100vh - ${theme.spacing(16)})`,
      },
    }),
    fullscreen: {
      ...modalLayoutMixin,
      maxWidth: (theme) => theme.breakpoints.values.desktop,
      margin: (theme) => `0 ${theme.spacing(6)}`,
    },
  },
} as const;

export default {
  modal,
  overlay,
};
