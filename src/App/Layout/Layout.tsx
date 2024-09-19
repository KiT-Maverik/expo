import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { BannerProvider, useAppSelector, selectAppState } from "App";
import { Footer, Drawer, Toolbar } from "design/templates";

import style from "./Layout.styles";

export const Layout = () => {
  const { showLeftDrawer, showRightDrawer } = useAppSelector(selectAppState);

  return (
    <>
      <BannerProvider />

      <Toolbar />

      <Box component="main" sx={style.main}>
        <Drawer show={showLeftDrawer} side="left" />
        {<Outlet />}
        <Drawer show={showRightDrawer} side="right" />
      </Box>

      <Footer />
    </>
  );
};
