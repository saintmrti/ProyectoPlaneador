import Tooltip from "@mui/material/Tooltip";

export const TooltipWrapper = ({ open, title, children }) => {
  return open ? children : <Tooltip title={title}>{children}</Tooltip>;
};
