import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Tooltip from "@mui/material/Tooltip";
import { authSignOut } from "../../slices/auth";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { router } from "../routes";
import Drawer from "../Drawer";
import logo from "../../assets/img/qualtia_logo.gif";
import { ProfileWrapper, UserName, UserEmail } from "./styled";

export default function NavBar({ tokenData }) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 100,
              mr: "auto",
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ color: "white" }}
              onClick={() => router.navigate("/")}
            >
              INICIO
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <Tooltip title="Notificaciones">
              <IconButton
                size="large"
                sx={{ color: "white" }}
                onClick={(f) => f}
              >
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Configuración">
              <IconButton
                size="large"
                sx={{ color: "white" }}
                onClick={() => router.navigate("/configuracion")}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton edge="end" onClick={handleOpenUserMenu}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: 18,
                    bgcolor: "#03897b",
                    color: "#FAFAFA",
                    fontWeight: "400",
                  }}
                >
                  {tokenData.userName.toUpperCase()[0]}
                </Avatar>
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <ProfileWrapper>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      fontSize: 40,
                      bgcolor: "#03897b",
                      color: "#FAFAFA",
                      fontWeight: "400",
                    }}
                  >
                    {tokenData.userName.toUpperCase()[0]}
                  </Avatar>
                  <UserName>{tokenData.userName}</UserName>
                  <UserEmail sx={{ color: "text.secondary" }}>
                    {tokenData.userEmail}
                  </UserEmail>
                </ProfileWrapper>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleCloseUserMenu();
                      dispatch(authSignOut());
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar sesión" />
                  </ListItemButton>
                </ListItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />
    </>
  );
}
