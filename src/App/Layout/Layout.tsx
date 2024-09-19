import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { Outlet } from "react-router-dom";

import {
  BannerProvider,
  useAppSelector,
  selectAppState,
  useAppDispatch,
  closeLeftDrawer,
  openLeftDrawer,
  openRightDrawer,
  closeRightDrawer,
  projectName,
} from "App";
import { Footer, Drawer } from "design/templates";

import style from "./Layout.styles";

export const Layout = () => {
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const { showLoader, showLeftDrawer, showRightDrawer } =
    useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  return (
    <>
      <BannerProvider />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={style.contentArea}>
          <Box component="header">
            <AppBar sx={style.appBar}>
              <ButtonBase
                onClick={() =>
                  showLeftDrawer
                    ? dispatch(closeLeftDrawer())
                    : dispatch(openLeftDrawer())
                }
                sx={style.menuButton}
              >
                <MenuIcon />
                <Typography variant="h6" component="div" flexGrow={1}>
                  {projectName}
                </Typography>
              </ButtonBase>
              <Toolbar ref={toolbarRef} sx={style.toolbar.container}>
                <Button
                  color="inherit"
                  onClick={() =>
                    showLeftDrawer
                      ? dispatch(closeLeftDrawer())
                      : dispatch(openLeftDrawer())
                  }
                >
                  Toggle Left Drawer
                </Button>
                <Button
                  color="inherit"
                  onClick={() =>
                    showRightDrawer
                      ? dispatch(closeRightDrawer())
                      : dispatch(openRightDrawer())
                  }
                >
                  Toggle Right Drawer
                </Button>
              </Toolbar>
              {showLoader && <LinearProgress sx={style.toolbar.loader} />}
            </AppBar>
          </Box>
          <Box component="main" sx={style.main}>
            <Drawer show={showLeftDrawer} side="left" />
            {<Outlet />}
            <Drawer show={showRightDrawer} side="right" />
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};
