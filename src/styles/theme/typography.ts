import { TypographyOptions } from "@mui/material/styles/createTypography";
import { converter } from "utils/converters/pxToRem.util";

const fontSize = 16;

export const { pxToRem } = converter(fontSize);

export const typography: TypographyOptions = {
  fontFamily: "Roboto",
  htmlFontSize: fontSize,
  body1: {
    fontSize: pxToRem(14),
  },
  body2: {
    fontSize: pxToRem(14),
  },
  subtitle1: {
    fontSize: pxToRem(18),
    lineHeight: "152%",
  },
  subtitle2: {
    fontSize: pxToRem(16),
    lineHeight: "175%",
    letterSpacing: "0.15px",
  },
  overline: {
    fontSize: pxToRem(12),
    lineHeight: "266%",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  caption: {
    fontSize: pxToRem(12),
    lineHeight: "166%",
    letterSpacing: "0.4px",
  },
  h1: {
    fontSize: pxToRem(72),
    textTransform: "uppercase",
    fontWeight: 800,
  },
  h2: {
    fontSize: pxToRem(20),
    textTransform: "uppercase",
    marginBottom: "8px",
    fontWeight: 800,
  },
  h3: {
    fontSize: pxToRem(16),
    textTransform: "uppercase",
  },
  h4: {
    fontSize: pxToRem(34),
    lineHeight: "123.5%",
  },
  h5: {
    fontSize: pxToRem(30),
    lineHeight: "126.5%",
  },
  h6: {
    fontSize: pxToRem(24),
    lineHeight: "133.5%",
  },
};
