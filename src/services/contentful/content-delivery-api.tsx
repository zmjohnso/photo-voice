import React, { useEffect, useState } from "react";
import { VoiceEntry } from "../../shared/content-types";
import { createClient, Entry } from "contentful";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useStore } from "../../store/store";
import { Stack } from "@mui/system";

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

    // filter by author name
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
            sx={{
              display: "flex",
              height: `${entry.fields.photo[0].fields.file.details.image.height}`,
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            variant="outlined"
          >
            {entry.fields.photo.length === 1 && (
              <CardMedia
                component="img"
                sx={{ width: 1 / 2 }}
                image={entry.fields.photo[0].fields.file.url}
                alt={entry.fields.photo[0].fields.title}
              />
            )}
            {entry.fields.photo.length > 1 && (
              <ImageList
                sx={{
                  width:
                    entry.fields.photo[0].fields.file.details.image.width * 3,
                  height:
                    entry.fields.photo[0].fields.file.details.image.height,
                }}
                cols={3}
                rowHeight={
                  entry.fields.photo[0].fields.file.details.image.height
                }
              >
                {entry.fields.photo.map((photo) => (
                  <ImageListItem key={photo.fields.title}>
                    <img
                      src={photo.fields.file.url}
                      srcSet={photo.fields.file.url}
                      alt={photo.fields.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Stack spacing={3}>
                  <Stack spacing={2} direction="row">
                    <Typography gutterBottom component="div" variant="h5">
                      {entry.fields.japaneseTitle}
                    </Typography>
                    <Typography gutterBottom component="div" variant="h5">
                      |
                    </Typography>
                    <Typography gutterBottom component="div" variant="h5">
                      {entry.fields.englishTitle}
                    </Typography>
                  </Stack>
                  <Typography gutterBottom variant="body1" component="div">
                    <ReactMarkdown>{entry.fields.japaneseVoice}</ReactMarkdown>
                  </Typography>
                  {entry.fields.englishVoice && (
                    <Typography gutterBottom variant="body1" component="div">
                      <ReactMarkdown>{entry.fields.englishVoice}</ReactMarkdown>
                    </Typography>
                  )}
                  <Stack alignItems="flex-end">
                    <Typography gutterBottom variant="body2" component="div">
                      {entry.fields.voiceAuthor.fields.japaneseName} |{" "}
                      {entry.fields.voiceAuthor.fields.englishName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {entry.fields.photoLocation.fields.photoPrefecture}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {entry.fields.photoLocation.fields.photoCity}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      {entry.fields.photoLocation.fields.photoLocationDetail}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {entry.fields.voiceDate.toString()}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Box>
          </Card>
        );
      })}
    </>
  );
};
