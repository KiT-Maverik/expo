import ErrorIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { route } from "App";
import { Page } from "design/templates";

import style from "./NotFoundPage.styles.ts";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <ErrorIcon sx={style.icon} />
      <Typography variant="h2" textAlign="center">
        The page you are looking for is not found
      </Typography>
      <Button onClick={() => navigate(route.home)}>Go Home</Button>
    </Page>
  );
};
