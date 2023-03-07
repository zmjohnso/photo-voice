import React, { useEffect, useState } from "react";
import { VoiceEntry } from '../../shared/content-types';
import { createClient, Entry } from 'contentful';
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export const GetEntries: React.FC<{keywords: string[]}> = (props) => {
    const [voiceEntries, setVoiceEntries] = useState<Entry<VoiceEntry>[] | undefined>();
    const client = createClient({
        space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
        environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT_ID,
        accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY
      })

    // Add error handling
    useEffect(() => {
        client.getEntries<VoiceEntry>().then((entries) => setVoiceEntries(entries.items)).catch(console.error);
    }, [props.keywords]);

    // voiceEntries must have at least one common keyword with the props keyword list
    const filteredVoiceEntries: Entry<VoiceEntry>[] = [];
    voiceEntries?.map(entry => {
        entry.fields.keywords.forEach(keyword => {
            if (props.keywords.includes(keyword) && !filteredVoiceEntries.includes(entry)) {
                filteredVoiceEntries.push(entry);
            }
        })
    });

    return (
        <>
            {filteredVoiceEntries?.map(entry => {
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