import React from "react";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Box,
  Button,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import Read from "../../Read/components/Read";
import { Link, useHistory, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../Authentication/components/cutoms/middleware";
import { signOut } from "../../Authentication/middleWare/index";
function Presentation() {
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorE2, setAnchorE2] = React.useState(null);
  const open1 = Boolean(anchorE2);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
 
  return (
    <div>
      <CssBaseline />
    {isAuthenticated()===false && <Redirect to="/user/signIn"/>}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin
            </Typography>

            <div style={{ marginLeft: "auto" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <div style={{ textDecoration: "none" }}>
                  <Link to="/user/profile">
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <Link to="/user/changePassword">
                    <MenuItem>ChangePassword</MenuItem>
                  </Link>
                  {isAuthenticated() && (
                    <MenuItem
                      onClick={signOut }
                    >SignOut</MenuItem>
                  )}
                </div>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Read />
    </div>
  );
}

export default Presentation;
