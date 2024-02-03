import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

export const PhotoVoiceAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    activeColor: string;
  }

  const NavLinkItem: React.FC<NavLinkItemProps> = (props) => (
    <NavLink
      style={({ isActive }) => {
        return {
          color: isActive ? props.activeColor : "inherit",
          textDecoration: "none",
        };
      }}
      to={props.location}
      onClick={handleClose}
    >
      {props.title}
    </NavLink>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
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
                  activeColor="green"
                />
              </MenuItem>
            ))}
          </Menu>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "95%",
            }}
          >
            {Array.from(navItems.entries()).map((item) => (
              <NavLinkItem
                key={item[0]}
                title={item[0]}
                location={item[1]}
                activeColor="black"
              />
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};
