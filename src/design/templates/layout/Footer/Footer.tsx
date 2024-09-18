import {
  Box,
} from "@mui/material";

import style from "./Footer.styles.ts";

export type Footer_ContentSet = "default" | "customized";

interface FooterProps {
  contentSet?: Footer_ContentSet;
}

export const Footer = ({ contentSet = "default" }: FooterProps) => {
  if (contentSet === "default")
    return (
      <Box component="footer" sx={style.container}>
        footer
      </Box>
    );
};
