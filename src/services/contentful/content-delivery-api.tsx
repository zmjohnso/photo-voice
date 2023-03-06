import React, { useState } from "react";
import { VoiceEntry } from '../../shared/content-types';
import { createClient, Entry } from 'contentful';
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export const GetEntries: React.FC = () => {
    const [voiceEntries, setVoiceEntries] = useState<Entry<VoiceEntry>[] | undefined>();
    const client = createClient({
        space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
        environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT_ID,
        accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY
      })

    // Add error handling
    client.getEntries<VoiceEntry>().then((entries) => setVoiceEntries(entries.items)).catch(console.error);

    return (
        <>
            {voiceEntries?.map(entry => {
                return (
                    <Card sx={{ display: 'flex' }} variant="outlined">
                        <CardMedia component="img" sx={{ width: 1/2 }} image={entry.fields.photo[0].fields.file.url} alt={"Photo Voice image"} />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography gutterBottom component="div" variant="h5">
                                    {entry.fields.title}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div">
                                    {entry.fields.japaneseVoice}
                                </Typography>
                                <Typography variant="body2" component="div">
                                    {entry.fields.englishVoice}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card> 
                )
            })}
        </> 
    );
}