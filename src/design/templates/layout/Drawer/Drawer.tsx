import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";

import { selectAppState, useAppSelector } from "App";

import style from "./Drawer.styles.ts";

export type DrawerSide = "left" | "right";

interface DrawerProps {
  side: DrawerSide;
}

export const Drawer = ({ side }: DrawerProps) => {
  const { showLeftDrawer, showRightDrawer } = useAppSelector(selectAppState);

  const items = useMemo(() => {
    // Add conditional logic here to render various sets of content for various situations
    return (
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }, []);

  return (
    <Box
      sx={style.container(
        side === "left" ? showLeftDrawer : showRightDrawer,
        side,
      )}
    >
      {items}
    </Box>
  );
};
