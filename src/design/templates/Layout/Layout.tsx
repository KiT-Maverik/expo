import React from "react";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import { BannerProvider } from "App";

import style from "./Layout.styles";

export const Layout = () => {
  return (
    <>
      <BannerProvider />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" flexGrow={1}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={style.main}>
        {<Outlet />}
      </Box>
    </>
  );
};
