import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";

import { BannerProvider, useAppSelector, selectAppState } from "App";

import style from "./Layout.styles";

export const Layout = () => {
  const { showLoader } = useAppSelector(selectAppState);

  return (
    <>
      <BannerProvider />
      <AppBar position="relative">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" flexGrow={1}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {showLoader && <LinearProgress sx={style.loader} />}
      </AppBar>
      <Box component="main" sx={style.main}>
        {<Outlet />}
      </Box>
    </>
  );
};
