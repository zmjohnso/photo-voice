import React, { useState } from "react";
import { VoiceEntry } from '../../shared/content-types';
import { createClient } from 'contentful';

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
        <>
            <div>{voiceEntry?.title}</div>
            <br></br>
            <img src={voiceEntry?.photo[0].fields.file.url} alt="photo voice image"></img>
            <br></br>
            <div>{voiceEntry?.japaneseVoice}</div>
            <br></br>
            <div>{voiceEntry?.englishVoice}</div>
        </>
    );
}