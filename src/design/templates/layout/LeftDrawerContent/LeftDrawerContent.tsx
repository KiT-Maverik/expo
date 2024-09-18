import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import style from "./LeftDrawerContent.styles";

export type LeftDrawer_ContentSet = "default" | "customized";

interface LeftDrawerContentProps {
  contentSet?: LeftDrawer_ContentSet;
}

export const LeftDrawerContent = ({
  contentSet = "default",
}: LeftDrawerContentProps) => {
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
