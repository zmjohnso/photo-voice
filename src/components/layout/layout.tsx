import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useStore } from "../../store/store";

export const Layout: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const [colorMode, setColorMode] = useStore((state) => [
    state.colorMode,
    state.setColorMode,
  ]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  const navItems = new Map<string, string>([
    ["ホーム・Home", "/"],
    ["検索・Search", "/search"],
    ["事業概要・About", "/about"],
    ["お問い合わせ・Contact", "/contact"],
  ]);

  interface NavLinkItemProps {
    location: string;
    title: string;
    color: string;
  }

  const NavLinkItem: React.FC<NavLinkItemProps> = (props) => (
    <NavLink
      style={({ isActive }) => {
        return {
          color: isActive ? props.color : "inherit",
          textDecoration: "none",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 500,
        };
      }}
      to={props.location}
      onClick={handleClose}
    >
      {props.title}
    </NavLink>
  );

  return (
    <Box
      height="100vh"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
            {Array.from(navItems.entries()).map((item) => (
              <MenuItem key={item[0]}>
                <NavLinkItem
                  title={item[0]}
                  location={item[1]}
                  color={theme.palette.primary.main}
                />
              </MenuItem>
            ))}
          </Menu>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "7rem",
              width: "95%",
            }}
          >
            {Array.from(navItems.entries()).map((item) => (
              <NavLinkItem
                key={item[0]}
                title={item[0]}
                location={item[1]}
                color={
                  colorMode === "light"
                    ? theme.palette.secondary.contrastText
                    : theme.palette.primary.main
                }
              />
            ))}
          </Box>
          <IconButton onClick={handleColorMode} color="inherit">
            {colorMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};
