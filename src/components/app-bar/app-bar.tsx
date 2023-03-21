import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export const PhotoVoiceAppBar: React.FC = () => {
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
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.25 }}>
            Home
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.25 }}>
            <Link to={"about"}>About</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.25 }}>
            Contact
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
