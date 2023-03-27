import React, { useEffect, useState } from "react";
import { VoiceEntry } from "../../shared/content-types";
import { createClient, Entry } from "contentful";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useStore } from "../../store/store";

export const DisplayEntries: React.FC = () => {
  const photoLocations = useStore((state) => state.photoLocations);
  const englishAuthorNames = useStore((state) => state.englishAuthorNames);

  const [voiceEntries, setVoiceEntries] = useState<
    Entry<VoiceEntry>[] | undefined
  >();

  const [filteredVoiceEntries, setFilteredVoiceEntries] =
    useState<Entry<VoiceEntry>[]>();

  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY,
  });

  useEffect(() => {
    client
      .getEntries<VoiceEntry>({ content_type: "entry" })
      .then((entries) => {
        setVoiceEntries(entries.items);
        setFilteredVoiceEntries(entries.items);
      })
      .catch(console.error); // Add error handling
  }, []);

  useEffect(() => {
    const tempFilteredVoiceEntries: Entry<VoiceEntry>[] = [];

    // only need to check one of the English or Japanese names
    if (englishAuthorNames.length) {
      voiceEntries?.forEach((entry) => {
        const authorNameFields = entry.fields.voiceAuthor.fields;
        englishAuthorNames.forEach((name) => {
          if (
            authorNameFields.englishName === name &&
            !tempFilteredVoiceEntries?.includes(entry)
          ) {
            tempFilteredVoiceEntries.push(entry);
          }
        });
      });
    }

    // filter by photo location
    if (photoLocations.length) {
      voiceEntries?.forEach((entry) => {
        const photoFields = entry.fields.photoLocation.fields;
        photoLocations.forEach((location) => {
          if (
            (photoFields.photoPrefecture.includes(location) ||
              photoFields.photoCity?.includes(location)) &&
            !tempFilteredVoiceEntries?.includes(entry)
          ) {
            tempFilteredVoiceEntries.push(entry);
          }
        });
      });
    }
    tempFilteredVoiceEntries.length &&
      setFilteredVoiceEntries(tempFilteredVoiceEntries);
  }, [photoLocations, englishAuthorNames, voiceEntries]);

  return (
    <>
      {filteredVoiceEntries?.map((entry) => {
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
