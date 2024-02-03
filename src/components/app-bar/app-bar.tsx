import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export const PhotoVoiceAppBar: React.FC = () => {
  const navigate = useNavigate();
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
                <NavLink
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "green" : "inherit",
                    };
                  }}
                  to={item[1]}
                  onClick={handleClose}
                >
                  {item[0]}
                </NavLink>
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
              <Button
                key={item[0]}
                onClick={() => {
                  navigate(item[1]);
                  handleClose();
                }}
                sx={{ color: "#fff" }}
              >
                {item[0]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};
