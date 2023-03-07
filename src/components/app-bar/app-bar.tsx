import { AppBar, Autocomplete, Box, Button, IconButton, TextField, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

export const PhotoVoiceAppBar: React.FC<{setSelectedKeywords: (keywords: string[]) => void}> = (props) => {
    const navItems = ['Home', 'About', 'Contact'];
    const keywords = ['Tag1', 'Tag2', 'Tag3'];

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
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={keywords}
                    onChange={(event, value) => props.setSelectedKeywords(value)}
                    // getOptionLabel={keywords}
                    // defaultValue={[top100Films[13]]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Tags"
                            placeholder="Example Tag"
                        />
                    )}
                />
            </AppBar>
        </Box>
    );
}