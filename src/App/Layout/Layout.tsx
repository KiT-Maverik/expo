import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Divider,
  Drawer,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import {
  BannerProvider,
  useAppSelector,
  selectAppState,
  useAppDispatch,
  closeLeftDrawer,
  openLeftDrawer,
  projectName,
  openRightDrawer,
  closeRightDrawer,
} from "App";

import style from "./Layout.styles";

export const Layout = () => {
  const [drawerVerticalOffset, setDrawerVerticalOffset] = useState(0);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const { showLoader, showLeftDrawer, showRightDrawer } =
    useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toolbarRef.current)
      setDrawerVerticalOffset(toolbarRef.current.getBoundingClientRect().top);
  }, []);

  return (
    <>
      <BannerProvider />
      <Box sx={style.menuButton.container(drawerVerticalOffset)}>
        <ButtonBase
          sx={style.menuButton.button}
          onClick={() =>
            showLeftDrawer
              ? dispatch(closeLeftDrawer())
              : dispatch(openLeftDrawer())
          }
        >
          <MenuIcon />
          <Typography variant="h6" component="div" flexGrow={1}>
            {projectName}
          </Typography>
        </ButtonBase>
      </Box>
      <AppBar sx={style.appBar(showLeftDrawer, showRightDrawer)}>
        <Toolbar ref={toolbarRef} sx={style.toolbar.container}>
          <Button
            color="inherit"
            onClick={() =>
              showRightDrawer
                ? dispatch(closeRightDrawer())
                : dispatch(openRightDrawer())
            }
          >
            Login
          </Button>
        </Toolbar>
        {showLoader && <LinearProgress sx={style.toolbar.loader} />}
      </AppBar>
      <Drawer
        PaperProps={{ sx: style.drawer.container(drawerVerticalOffset) }}
        variant="persistent"
        anchor="left"
        open={showLeftDrawer}
        onClose={() => dispatch(closeLeftDrawer())}
      >
        <Box sx={style.drawer.header} />
        <Divider />
        Left drawer
      </Drawer>
      <Drawer
        PaperProps={{ sx: style.drawer.container(drawerVerticalOffset) }}
        variant="persistent"
        anchor="right"
        open={showRightDrawer}
        onClose={() => dispatch(closeLeftDrawer())}
      >
        <Box sx={style.drawer.header} />
        <Divider />
        Right drawer
      </Drawer>
      <Box component="main" sx={style.main(showLeftDrawer, showRightDrawer)}>
        {<Outlet />}
      </Box>
    </>
  );
};
