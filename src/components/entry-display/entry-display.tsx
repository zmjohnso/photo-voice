import {
  Box,
  Card,
  CardContent,
  CardMedia,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useStore } from "../../store/store";

export const EntryDisplay: React.FC = () => {
  const currentEntry = useStore((state) => state.currentEntry);

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  if (!currentEntry) {
    return <Box>No Entry is currently selected.</Box>;
  }

  return (
    <Card
      key={currentEntry.fields.entryId}
      sx={{
        display: "flex",
        height: `${currentEntry.fields.photo[0].fields.file.details.image.height}`,
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
      variant="outlined"
    >
      {currentEntry.fields.photo.length === 1 && (
        <CardMedia
          component="img"
          sx={{ width: 1 / 2 }}
          image={currentEntry.fields.photo[0].fields.file.url}
          alt={currentEntry.fields.photo[0].fields.title}
        />
      )}
      {currentEntry.fields.photo.length > 1 && (
        <ImageList
          sx={{
            width:
              currentEntry.fields.photo[0].fields.file.details.image.width * 3,
            height:
              currentEntry.fields.photo[0].fields.file.details.image.height,
          }}
          cols={3}
          rowHeight={
            currentEntry.fields.photo[0].fields.file.details.image.height
          }
        >
          {currentEntry.fields.photo.map((photo) => (
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
              {currentEntry.fields.japaneseTitle}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              <ReactMarkdown>{currentEntry.fields.japaneseVoice}</ReactMarkdown>
            </Typography>
            <Stack alignItems="flex-end">
              <Typography gutterBottom variant="body2" component="div">
                {currentEntry.fields.voiceAuthor.fields.japaneseName}
              </Typography>
              <Typography variant="body2" component="div">
                {
                  currentEntry.fields.photoLocation.fields.photoPrefecture.split(
                    "・"
                  )[0]
                }
              </Typography>
              {currentEntry.fields.photoLocation.fields.photoCity && (
                <Typography variant="body2" component="div">
                  {
                    currentEntry.fields.photoLocation.fields.photoCity.split(
                      "・"
                    )[0]
                  }
                </Typography>
              )}
              {currentEntry.fields.photoLocation.fields.photoLocationDetail && (
                <Typography gutterBottom variant="body2" component="div">
                  {
                    currentEntry.fields.photoLocation.fields.photoLocationDetail.split(
                      "・"
                    )[0]
                  }
                </Typography>
              )}
              <Typography variant="body2" component="div">
                {new Date(currentEntry.fields.photoDate).toLocaleDateString(
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
              {currentEntry.fields.englishTitle}
            </Typography>
            {currentEntry.fields.englishVoice && (
              <Typography gutterBottom variant="body1" component="div">
                <ReactMarkdown>
                  {currentEntry.fields.englishVoice}
                </ReactMarkdown>
              </Typography>
            )}
          </Stack>
          <Stack alignItems="flex-end">
            <Typography gutterBottom variant="body2" component="div">
              {currentEntry.fields.voiceAuthor.fields.englishName}
            </Typography>
            <Typography variant="body2" component="div">
              {
                currentEntry.fields.photoLocation.fields.photoPrefecture.split(
                  "・"
                )[1]
              }
            </Typography>
            {currentEntry.fields.photoLocation.fields.photoCity && (
              <Typography variant="body2" component="div">
                {
                  currentEntry.fields.photoLocation.fields.photoCity.split(
                    "・"
                  )[1]
                }
              </Typography>
            )}
            {currentEntry.fields.photoLocation.fields.photoLocationDetail && (
              <Typography gutterBottom variant="body2" component="div">
                {
                  currentEntry.fields.photoLocation.fields.photoLocationDetail.split(
                    "・"
                  )[1]
                }
              </Typography>
            )}
            <Typography variant="body2" component="div">
              {new Date(currentEntry.fields.photoDate).toLocaleDateString(
                "en-US",
                dateFormatOptions
              )}
            </Typography>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};