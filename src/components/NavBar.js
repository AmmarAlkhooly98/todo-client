import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/users";

const pagesLoggedIn = [{ name: "My Todos", to: "/todos" }];
const pagesNotLoggedIn = [
  { name: "Sign Up", to: "/signup" },
  { name: "Login", to: "/login" },
];
const settingsLoggedIn = [
  { name: "Profile", to: "/profile" },
  { name: "Logout", to: "/login" },
];

const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const loggedIn = window.localStorage.getItem("token") || null;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    e.target.innerHTML === "Logout" && dispatch(logoutAction());
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Todoist
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {loggedIn
                ? pagesLoggedIn.map((page, i) => (
                    <MenuItem key={i} onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`${page?.to}`}
                      >
                        <Typography textAlign="center">{page?.name}</Typography>
                      </Link>
                    </MenuItem>
                  ))
                : pagesNotLoggedIn.map((page, i) => (
                    <MenuItem key={i} onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`${page?.to}`}
                      >
                        <Typography textAlign="center">{page?.name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Todoist
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {loggedIn
              ? pagesLoggedIn.map((page, i) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`${page?.to}`}
                    key={i}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page?.name}
                    </Button>
                  </Link>
                ))
              : pagesNotLoggedIn.map((page, i) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`${page?.to}`}
                    key={i}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page?.name}
                    </Button>
                  </Link>
                ))}
          </Box>

          {loggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={`${user?.firstName + " " + user?.lastName}`}
                    src={`${user?.image}`}
                  />
                </IconButton>
              </Tooltip>
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
                {settingsLoggedIn.map((setting, i) => {
                  return (
                    <Link key={i} to={`${setting?.to}`}>
                      <MenuItem
                        name={setting?.name}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">
                          {setting?.name}
                        </Typography>
                      </MenuItem>
                    </Link>
                  );
                })}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
