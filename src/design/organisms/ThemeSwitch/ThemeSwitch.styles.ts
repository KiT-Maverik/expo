import { SxProps, switchClasses } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { blueGrey, yellow } from "@mui/material/colors";

const container: SxProps<Theme> = (theme: Theme) =>
  ({
    [`.${switchClasses.thumb}`]: {
      backgroundColor: yellow["100"],

      ...theme.applyStyles("dark", {
        backgroundColor: blueGrey["700"],
      }),
    },
  }) as const;

export default {
  container,
};
