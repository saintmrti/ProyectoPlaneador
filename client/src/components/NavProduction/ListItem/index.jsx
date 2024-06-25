import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const ListItem = ({ label, open, children, ...props }) => (
  <ListItemButton
    {...props}
    key={label}
    sx={{
      minHeight: 48,
      justifyContent: open ? "initial" : "center",
      px: 2.5,
    }}
  >
    <ListItemIcon
      sx={{
        minWidth: 0,
        mr: open ? 3 : "auto",
        justifyContent: "center",
      }}
    >
      {children}
    </ListItemIcon>
    <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
  </ListItemButton>
);
