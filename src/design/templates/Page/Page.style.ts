import { SxProps, Theme } from "@mui/material";

const container: SxProps<Theme> = (theme: Theme) =>
  ({
    flexGrow: 1,
    px: (theme) => theme.mixins.contentSpacingX.sm,
    py: 5,

    [theme.breakpoints.up("tablet")]: {
      px: (theme) => theme.mixins.contentSpacingX.lg,
    },
  }) as const;

export default {
  container,
};
