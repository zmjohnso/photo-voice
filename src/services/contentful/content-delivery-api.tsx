import React, { useEffect, useState } from "react";
import { VoiceEntry } from "../../shared/content-types";
import { createClient, Entry } from "contentful";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useStore } from "../../store/store";
import { Stack } from "@mui/system";

export const DisplayEntries: React.FC = () => {
  const photoLocations = useStore((state) => state.photoLocations);
  const englishAuthorNames = useStore((state) => state.englishAuthorNames);
  const photoStartDate = useStore((state) => state.photoStartDate);
  const photoEndDate = useStore((state) => state.photoEndDate);
  const voiceStartDate = useStore((state) => state.voiceStartDate);
  const voiceEndDate = useStore((state) => state.voiceEndDate);

  const [voiceEntries, setVoiceEntries] = useState<
    Entry<VoiceEntry>[] | undefined
  >();

  const [filteredVoiceEntries, setFilteredVoiceEntries] = useState<
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

    // filter by photo date
    if (photoStartDate && photoEndDate) {
      voiceEntries?.forEach((entry) => {
        const photoDate = new Date(entry.fields.photoDate);
        if (photoDate.getFullYear() > photoStartDate.getFullYear()) {
          if (photoDate.getFullYear() < photoEndDate.getFullYear()) {
            tempFilteredVoiceEntries.push(entry);
          } else if (photoDate.getFullYear() === photoEndDate.getFullYear()) {
            if (photoDate.getMonth() >= photoStartDate.getMonth()) {
              tempFilteredVoiceEntries.push(entry);
            }
          }
        }
      });
    }

    // filter by voice date
    if (voiceStartDate && voiceEndDate) {
      voiceEntries?.forEach((entry) => {
        const voiceDate = new Date(entry.fields.voiceDate);
        if (voiceDate.getFullYear() > voiceStartDate.getFullYear()) {
          if (voiceDate.getFullYear() < voiceEndDate.getFullYear()) {
            tempFilteredVoiceEntries.push(entry);
          } else if (voiceDate.getFullYear() === voiceEndDate.getFullYear()) {
            if (voiceDate.getMonth() >= voiceStartDate.getMonth()) {
              tempFilteredVoiceEntries.push(entry);
            }
          }
        }
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

    // if store is empty use voiceEntries as "default", else use filtered entries list
    if (
      !englishAuthorNames.length &&
      !photoStartDate &&
      !photoEndDate &&
      !voiceStartDate &&
      !voiceEndDate &&
      !photoLocations.length
    ) {
      setFilteredVoiceEntries(voiceEntries);
    } else {
      setFilteredVoiceEntries(tempFilteredVoiceEntries);
    }
  }, [
    photoLocations,
    englishAuthorNames,
    voiceEntries,
    voiceStartDate,
    voiceEndDate,
    photoStartDate,
    photoEndDate,
  ]);

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  if (voiceEntries === undefined) {
    return (
      <Box
        position="fixed"
        top="50%"
        left="50%"
        marginTop="-2.5rem"
        marginLeft="-2.5rem"
      >
        <CircularProgress size="5rem" />
      </Box>
    );
  }

  return (
    <>
      {filteredVoiceEntries?.length ? (
        filteredVoiceEntries?.map((entry) => {
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
                  <Stack spacing={2}>
                    <Typography gutterBottom component="div" variant="h5">
                      {entry.fields.japaneseTitle}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                      <ReactMarkdown>
                        {entry.fields.japaneseVoice}
                      </ReactMarkdown>
                    </Typography>
                    <Stack alignItems="flex-end">
                      <Typography gutterBottom variant="body2" component="div">
                        {entry.fields.voiceAuthor.fields.japaneseName}
                      </Typography>
                      <Typography variant="body2" component="div">
                        {
                          entry.fields.photoLocation.fields.photoPrefecture.split(
                            "・"
                          )[0]
                        }
                      </Typography>
                      {entry.fields.photoLocation.fields.photoCity && (
                        <Typography variant="body2" component="div">
                          {
                            entry.fields.photoLocation.fields.photoCity.split(
                              "・"
                            )[0]
                          }
                        </Typography>
                      )}
                      {entry.fields.photoLocation.fields
                        .photoLocationDetail && (
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                        >
                          {
                            entry.fields.photoLocation.fields.photoLocationDetail.split(
                              "・"
                            )[0]
                          }
                        </Typography>
                      )}
                      <Typography variant="body2" component="div">
                        {new Date(entry.fields.voiceDate).toLocaleDateString(
                          "ja-JP",
                          dateFormatOptions
                        )}
                      </Typography>
                    </Stack>
                  </Stack>

                  <br></br>
                  <br></br>
                  <br></br>

                  <Stack spacing={2}>
                    <Typography gutterBottom component="div" variant="h5">
                      {entry.fields.englishTitle}
                    </Typography>
                    {entry.fields.englishVoice && (
                      <Typography gutterBottom variant="body1" component="div">
                        <ReactMarkdown>
                          {entry.fields.englishVoice}
                        </ReactMarkdown>
                      </Typography>
                    )}
                  </Stack>
                  <Stack alignItems="flex-end">
                    <Typography gutterBottom variant="body2" component="div">
                      {entry.fields.voiceAuthor.fields.englishName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {
                        entry.fields.photoLocation.fields.photoPrefecture.split(
                          "・"
                        )[1]
                      }
                    </Typography>
                    {entry.fields.photoLocation.fields.photoCity && (
                      <Typography variant="body2" component="div">
                        {
                          entry.fields.photoLocation.fields.photoCity.split(
                            "・"
                          )[1]
                        }
                      </Typography>
                    )}
                    {entry.fields.photoLocation.fields.photoLocationDetail && (
                      <Typography gutterBottom variant="body2" component="div">
                        {
                          entry.fields.photoLocation.fields.photoLocationDetail.split(
                            "・"
                          )[1]
                        }
                      </Typography>
                    )}
                    <Typography variant="body2" component="div">
                      {new Date(entry.fields.voiceDate).toLocaleDateString(
                        "en-US",
                        dateFormatOptions
                      )}
                    </Typography>
                  </Stack>
                </CardContent>
              </Box>
            </Card>
          );
        })
      ) : (
        <Box paddingTop="1rem">
          <Typography>
            No voices found for your search parameters. Please alter your search
            and try again.
          </Typography>
        </Box>
      )}
    </>
  );
};
