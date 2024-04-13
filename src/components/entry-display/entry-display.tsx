import {
  Box,
  Card,
  CardContent,
  CardMedia,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useStore } from "../../store/store";
import { DATE_FORMAT_OPTIONS } from "../../shared/utilities";

export const EntryDisplay: React.FC = () => {
  const [currentEntry, languageMode] = useStore((state) => [
    state.currentEntry,
    state.languageMode,
  ]);
  const theme = useTheme();

  if (!currentEntry) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        paddingTop="2rem"
        color={theme.palette.text.primary}
      >
        No Entry is currently selected.
      </Box>
    );
  }

  return (
    <Card
      key={currentEntry.fields.entryId}
      sx={{
        display: "flex",
        height: "95%",
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
      variant="outlined"
    >
      {currentEntry.fields.photo.length === 1 && (
        <CardMedia
          component="img"
          sx={{ width: "50vw", maxHeight: "75%" }}
          image={currentEntry.fields.photo[0].fields.file.url}
          alt={currentEntry.fields.photo[0].fields.title}
        />
      )}
      {currentEntry.fields.photo.length > 1 && (
        <ImageList
          sx={{
            width: "70vw",
            height: "95%",
          }}
          cols={1}
          rowHeight={"auto"}
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
              {currentEntry.fields.title}
            </Typography>
            {currentEntry.fields.voice && (
              <Typography gutterBottom variant="body1" component="div">
                <ReactMarkdown>{currentEntry.fields.voice}</ReactMarkdown>
              </Typography>
            )}
          </Stack>
          <Stack alignItems="flex-end">
            <Typography gutterBottom variant="body2" component="div">
              {currentEntry.fields.voiceAuthor.fields.name}
            </Typography>
            <Typography variant="body2" component="div">
              {currentEntry.fields.photoLocation.fields.photoPrefecture}
            </Typography>
            {currentEntry.fields.photoLocation.fields.photoCity && (
              <Typography variant="body2" component="div">
                {currentEntry.fields.photoLocation.fields.photoCity}
              </Typography>
            )}
            {currentEntry.fields.photoLocation.fields.photoLocationDetail && (
              <Typography gutterBottom variant="body2" component="div">
                {currentEntry.fields.photoLocation.fields.photoLocationDetail}
              </Typography>
            )}
            <Typography variant="body2" component="div">
              {new Date(currentEntry.fields.photoDate).toLocaleDateString(
                languageMode === "ja" ? "ja-JP" : "en-US",
                DATE_FORMAT_OPTIONS
              )}
            </Typography>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
