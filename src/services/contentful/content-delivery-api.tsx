import React, { useEffect, useState } from "react";
import { VoiceEntry } from "../../shared/content-types";
import { createClient, Entry } from "contentful";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useStore } from "../../store/store";

export const DisplayEntries: React.FC = () => {
  const photoLocations = useStore((state) => state.photoLocations);

  const [voiceEntries, setVoiceEntries] = useState<
    Entry<VoiceEntry>[] | undefined
  >();
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY,
  });

  useEffect(() => {
    client
      .getEntries<VoiceEntry>({ content_type: "entry" })
      .then((entries) => setVoiceEntries(entries.items))
      .catch(console.error); // Add error handling
  }, []);

  // TODO: fix filtering by photo location
  // filter voice entries by photo location
  const filteredVoiceEntries: Entry<VoiceEntry>[] = [];
  voiceEntries?.map((entry) => {
    const combinedPhotoLocation =
      entry.fields.photoLocation.fields.photoPrefecture +
      entry.fields.photoLocation.fields.photoCity +
      entry.fields.photoLocation.fields.photoLocationDetail;
    if (
      photoLocations.includes(combinedPhotoLocation) &&
      !filteredVoiceEntries.includes(entry)
    ) {
      filteredVoiceEntries.push(entry);
    }
  });

  return (
    <>
      {voiceEntries?.map((entry) => {
        return (
          <Card
            key={entry.fields.entryId}
            sx={{ display: "flex" }}
            variant="outlined"
          >
            <CardMedia
              component="img"
              sx={{ width: 1 / 2 }}
              image={entry.fields.photo[0].fields.file.url}
              alt={"Photo Voice image"}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography gutterBottom component="div" variant="h5">
                  {entry.fields.englishTitle}
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
        );
      })}
    </>
  );
};
