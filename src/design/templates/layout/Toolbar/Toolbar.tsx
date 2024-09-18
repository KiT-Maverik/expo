import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import style from "./Toolbar.styles.ts";

export type Toolbar_ContentSet = "default" | "customized";

interface ToolbarProps {
  contentSet?: Toolbar_ContentSet;
}

export const Toolbar = ({ contentSet = "default" }: ToolbarProps) => {
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
