import ErrorIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import { Box, Button, Typography } from "@mui/material";

import style from "./Fallback.styles";
import { useNavigate } from "react-router-dom";

export const Fallback = () => {
  const navigate = useNavigate();

  return (
    <Box sx={style.container}>
      <ErrorIcon sx={style.icon} />
      <Typography variant="h2">Oops, something went wrong!</Typography>
      <Button onClick={() => navigate(0)}>Refresh The Page</Button>
    </Box>
  );
};
