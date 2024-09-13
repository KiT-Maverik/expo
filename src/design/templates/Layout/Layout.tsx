import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  BannerProvider,
  useAppSelector,
  selectAppState,
  useAppDispatch,
  closeDrawer,
  openDrawer,
} from "App";

import style from "./Layout.styles";
import { useEffect, useRef, useState } from "react";

export const Layout = () => {
  const [drawerVerticalOffset, setDrawerVerticalOffset] = useState(0);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const { showLoader, showDrawer } = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toolbarRef.current)
      setDrawerVerticalOffset(toolbarRef.current.getBoundingClientRect().top);
  }, []);

  return (
    <>
      <BannerProvider />
      <AppBar position="relative">
        <Toolbar ref={toolbarRef}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() =>
              showDrawer ? dispatch(closeDrawer()) : dispatch(openDrawer())
            }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" flexGrow={1}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {showLoader && <LinearProgress sx={style.loader} />}
      </AppBar>
      <Drawer
        PaperProps={{ sx: style.drawer.container(drawerVerticalOffset) }}
        variant="persistent"
        anchor="left"
        open={showDrawer}
        onClose={() => dispatch(closeDrawer())}
      >
        <Box sx={style.drawer.header}>
          <IconButton onClick={() => console.log(1)}>pew</IconButton>
        </Box>
        <Divider />
        pepewpew
      </Drawer>
      <Box component="main" sx={style.main}>
        {<Outlet />}
      </Box>
    </>
  );
};
