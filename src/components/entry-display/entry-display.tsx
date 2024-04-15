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
import { useLoaderData } from "react-router-dom";
import { DisplayEntryLoaderValue } from "../../loaders/display-entry-loader";

export const EntryDisplay: React.FC = () => {
  const [languageMode] = useStore((state) => [state.languageMode]);
  const voiceEntry = useLoaderData() as DisplayEntryLoaderValue;
  const theme = useTheme();

  if (!voiceEntry) {
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
      key={voiceEntry.fields.entryId}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "95%",
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
      variant="outlined"
    >
      {voiceEntry.fields.photo[0].fields.file &&
        voiceEntry.fields.photo.length === 1 && (
          <CardMedia
            component="img"
            sx={{ width: { xs: "100vw", md: "50vw" }, maxHeight: "75%" }}
            image={voiceEntry.fields.photo[0].fields.file.url}
            alt={voiceEntry.fields.photo[0].fields.title}
          />
        )}
      {voiceEntry.fields.photo[0].fields.file &&
        voiceEntry.fields.photo.length > 1 && (
          <ImageList
            sx={{
              width: "70vw",
              height: "95%",
            }}
            cols={1}
            rowHeight={"auto"}
          >
            {voiceEntry.fields.photo.map((photo) => (
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
              {voiceEntry.fields.title}
            </Typography>
            {voiceEntry.fields.voice && (
              <Typography gutterBottom variant="body1" component="div">
                <ReactMarkdown>{voiceEntry.fields.voice}</ReactMarkdown>
              </Typography>
            )}
          </Stack>
          <Stack alignItems="flex-end">
            <Typography gutterBottom variant="body2" component="div">
              {voiceEntry.fields.voiceAuthor.fields.name}
            </Typography>
            <Typography variant="body2" component="div">
              {voiceEntry.fields.photoLocation.fields.photoPrefecture}
            </Typography>
            {voiceEntry.fields.photoLocation.fields.photoCity && (
              <Typography variant="body2" component="div">
                {voiceEntry.fields.photoLocation.fields.photoCity}
              </Typography>
            )}
            {voiceEntry.fields.photoLocation.fields.photoLocationDetail && (
              <Typography gutterBottom variant="body2" component="div">
                {voiceEntry.fields.photoLocation.fields.photoLocationDetail}
              </Typography>
            )}
            <Typography variant="body2" component="div">
              {new Date(voiceEntry.fields.photoDate).toLocaleDateString(
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
