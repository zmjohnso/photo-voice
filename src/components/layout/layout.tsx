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
import TranslateIcon from "@mui/icons-material/Translate";
import { NavLink, Outlet } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";
import React from "react";
import { useStore } from "../../store/store";

export const Layout: React.FC = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [translateAnchorEl, setTranslateMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const theme = useTheme();
  const [colorMode, setColorMode, languageMode, setLanguageMode] = useStore(
    (state) => [
      state.colorMode,
      state.setColorMode,
      state.languageMode,
      state.setLanguageMode,
    ]
  );

  const menuOpen = Boolean(menuAnchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleGithubClick = () => {
    window.open("https://github.com/zmjohnso/photo-voice", "_blank");
  };

  const translateOpen = Boolean(translateAnchorEl);
  const handleTranslateMenuClose = () => {
    setTranslateMenuAnchorEl(null);
  };
  const handleTranslateMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setTranslateMenuAnchorEl(event.currentTarget);
  };

  const handleLanguageMode = (currentLanguage: string) => {
    const newLanguageMode = currentLanguage === "English" ? "en-US" : "ja";
    setLanguageMode(newLanguageMode);
  };

  const handleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  const navItemsEnglish = new Map<string, string>([
    ["Home", "/"],
    ["Search", "/search"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ]);

  const navItemsJapanese = new Map<string, string>([
    ["ホーム", "/"],
    ["検索", "/search"],
    ["事業概要", "/about"],
    ["お問い合わせ", "/contact"],
  ]);

  const navItems =
    languageMode === "en-US" ? navItemsEnglish : navItemsJapanese;

  const languageOptions = ["English", "日本語"];

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
      onClick={handleMenuClose}
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
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={menuAnchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
          >
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
          <IconButton color="inherit" onClick={handleGithubClick}>
            <GitHubIcon />
          </IconButton>
          <IconButton
            aria-label="translate button"
            color="inherit"
            onClick={handleTranslateMenuClick}
          >
            <TranslateIcon />
          </IconButton>
          <Menu
            id="translate-menu"
            anchorEl={translateAnchorEl}
            open={translateOpen}
            onClose={handleTranslateMenuClose}
          >
            {languageOptions.map((item) => (
              <MenuItem
                key={item}
                onClick={() => {
                  handleLanguageMode(item);
                  handleTranslateMenuClose();
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
          <IconButton onClick={handleColorMode} color="inherit">
            {colorMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};
