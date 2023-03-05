import React, { useState } from "react";
import { VoiceEntry } from '../../shared/content-types';
import { createClient } from 'contentful';
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export const GetEntry: React.FC = () => {
    const [voiceEntry, setVoiceEntry] = useState<VoiceEntry | undefined>();
    const client = createClient({
        space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
        environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT_ID,
        accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY
      })
    
    // Add error handling
    client.getEntry<VoiceEntry>(import.meta.env.VITE_FIRST_ENTRY_ID).then((entry) => setVoiceEntry(entry.fields));

    return (
        <Card sx={{ display: 'flex' }} variant="outlined">
            <CardMedia component="img" sx={{ width: 1/2 }} image={voiceEntry?.photo[0].fields.file.url} alt={voiceEntry?.photo[0].fields.title} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography gutterBottom component="div" variant="h5">
                        {voiceEntry?.title}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                        {voiceEntry?.japaneseVoice}
                    </Typography>   
                    <Typography variant="body2" component="div">
                        {voiceEntry?.englishVoice}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}