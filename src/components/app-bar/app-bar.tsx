import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

export const PhotoVoiceAppBar: React.FC = () => {
    const navItems = ['Home', 'About', 'Contact'];

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
                    About
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 0.25 }}>
                    Contact
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}