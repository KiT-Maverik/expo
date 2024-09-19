import { SxProps, switchClasses } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { blueGrey, yellow, grey } from "@mui/material/colors";

const container: SxProps<Theme> = (theme: Theme) =>
  ({
    p: 0,
    overflow: "visible",

    [`.${switchClasses.switchBase}`]: {
      height: 1,
    },

    [`.${switchClasses.thumb}`]: {
      backgroundColor: yellow["100"],

      ...theme.applyStyles("dark", {
        backgroundColor: blueGrey["700"],
      }),
    },
    [`.${switchClasses.track}`]: {
      position: "absolute",
      top: "50%",
      width: "auto",
      left: 9,
      right: 9,
      transform: "translateY(-50%)",
      opacity: 1,
      height: 24,
      borderRadius: 12,
      backgroundColor: blueGrey["700"],

      ...theme.applyStyles("dark", {
        opacity: 1,
        backgroundColor: yellow["100"],
      }),
    },
  }) as const;

const icon: { moon: SxProps<Theme>; sun: SxProps<Theme> } = {
  moon: {
    fill: grey["100"],
    backgroundColor: blueGrey["700"],
    borderRadius: "50%",
  },
  sun: {
    fill: yellow["600"],
    backgroundColor: yellow["100"],
    borderRadius: "50%",
    padding: 0.5,
  },
};

export default {
  container,
  icon,
};
