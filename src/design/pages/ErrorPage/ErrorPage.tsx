import ErrorIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import style from "./ErrorPage.styles.ts";
import {route} from "variables";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={style.container}>
      <ErrorIcon sx={style.icon} />
      <Typography variant="h2">Oops, something went wrong!</Typography>
      {/*<Button onClick={() => navigate(route.home)}>Refresh The Content</Button>*/}
    </Box>
  );
};
