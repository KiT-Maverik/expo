import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import style from "./Drawer.styles.ts";
import { useMemo } from "react";

export type DrawerSide = "left" | "right";
export type DrawerItems = "default" | "customized";

interface DrawerProps {
  contentSet?: DrawerItems;
  show: boolean;
  side: DrawerSide;
}

export const Drawer = ({ contentSet = "default", show, side }: DrawerProps) => {
  const items = useMemo(() => {
    if (contentSet === "default")
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
    else return <></>;
  }, []);

  return <Box sx={style.container(show, side)}>{items}</Box>;
};
