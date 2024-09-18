import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import style from "./RightDrawerContent.styles.ts";

export type RightDrawer_ContentSet = "default" | "customized";

interface RightDrawerContentProps {
  contentSet?: RightDrawer_ContentSet;
}

export const RightDrawerContent = ({
  contentSet = "default",
}: RightDrawerContentProps) => {
  if (contentSet === "default")
    return (
      <List sx={style.container}>
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
};
