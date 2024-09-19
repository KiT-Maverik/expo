import { Breakpoints } from "@mui/material";

interface CustomBreakpoints {
  values: Breakpoints["values"];
}

export const breakpoints: CustomBreakpoints = {
  values: {
    mobile: 480, // xs
    tablet: 768, //sm
    laptop: 900, // md
    desktop: 1200, // lg
    fullWidth: 1600, // xl
  },
};
