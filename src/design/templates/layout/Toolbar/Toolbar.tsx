import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  LinearProgress,
  Toolbar as Mui_Toolbar,
  Typography,
} from "@mui/material";

import {
  closeLeftDrawer,
  closeRightDrawer,
  openLeftDrawer,
  openRightDrawer,
  projectName,
  selectAppState,
  useAppDispatch,
  useAppSelector,
} from "App";

import style from "./Toolbar.styles.ts";
import { useMemo } from "react";

export type Toolbar_ContentSet = "default" | "customized";

interface ToolbarProps {
  contentSet?: Toolbar_ContentSet;
}

export const Toolbar = ({ contentSet = "default" }: ToolbarProps) => {
  const { showLoader, showLeftDrawer, showRightDrawer } =
    useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  const items = useMemo(() => {
    if (contentSet === "default")
      return (
        <>
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
        </>
      );
    else return <></>;
  }, []);

  return (
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
        <Mui_Toolbar sx={style.toolbar.container}>{items}</Mui_Toolbar>
        {showLoader && <LinearProgress sx={style.toolbar.loader} />}
      </AppBar>
    </Box>
  );
};
