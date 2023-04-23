import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
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
            <MenuItem
              onClick={() => {
                navigate("/");
                handleClose();
              }}
            >
              ホーム・Home
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/search");
                handleClose();
              }}
            >
              検索・Search
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/about");
                handleClose();
              }}
            >
              事業概要・About
            </MenuItem>
          </Menu>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0.25 }}
            onClick={() => navigate("/")}
          >
            ホーム・Home
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0.25 }}
            onClick={() => navigate("/search")}
          >
            検索・Search
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0.25 }}
            onClick={() => navigate("/about")}
          >
            事業概要・About
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
