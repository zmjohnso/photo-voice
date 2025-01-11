import {
  Box,
  Card,
  CardContent,
  CardMedia,
  ImageList,
  ImageListItem,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useStore } from "../../store/store";
import { useShallow } from "zustand/shallow";
import { DATE_FORMAT_OPTIONS } from "../../shared/utilities";
import { Link, useLoaderData } from "react-router";
import { DisplayEntryLoaderValue } from "../../loaders/display-entry-loader";

const photoModalStyles = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  width: "80%",
  height: "80%",
};

export const EntryDisplay: React.FC = () => {
  const [languageMode] = useStore(useShallow((state) => [state.languageMode]));
  const voiceEntry = useLoaderData() as DisplayEntryLoaderValue;
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(
    `(min-width:${theme.breakpoints.values.md}px)`,
  );
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );

  const handlePhotoModalOpen = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handlePhotoModalClose = () => {
    setSelectedPhotoIndex(null);
  };

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
        margin: "1rem",
        overflowY: "auto",
      }}
      variant="outlined"
    >
      {voiceEntry.fields.photo[0].fields.file &&
        voiceEntry.fields.photo.length === 1 && (
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100vw", md: "50vw" },
            }}
            image={voiceEntry.fields.photo[0].fields.file.url}
            alt={voiceEntry.fields.photo[0].fields.title}
          />
        )}
      {voiceEntry.fields.photo[0].fields.file &&
        voiceEntry.fields.photo.length > 1 && (
          <ImageList
            sx={{
              width: { xs: "100vw", md: "50vw" },
              minWidth: { xs: "100vw", md: "40vw" },
              maxHeight: "100vh",
            }}
            cols={isMediumScreen ? 1 : 2}
            rowHeight={"auto"}
          >
            {voiceEntry.fields.photo.map((photo, index) => (
              <ImageListItem key={photo.fields.title}>
                <img
                  src={photo.fields.file.url}
                  srcSet={photo.fields.file.url}
                  alt={photo.fields.title}
                  loading="lazy"
                  onClick={() => handlePhotoModalOpen(index)}
                />
                <Modal
                  open={selectedPhotoIndex === index}
                  onClose={handlePhotoModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={photoModalStyles}>
                    <img
                      src={photo.fields.file.url}
                      srcSet={photo.fields.file.url}
                      alt={photo.fields.title}
                      width="100%"
                      height="100%"
                      loading="lazy"
                    />
                  </Box>
                </Modal>
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
        <CardContent
          sx={{ flex: "1 1 auto", maxHeight: "50vh", overflow: "auto" }}
        >
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
            <Link
              to={`/author/${voiceEntry.fields.voiceAuthor.sys.id}`}
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body2" component="div">
                {voiceEntry.fields.voiceAuthor.fields.name}
              </Typography>
            </Link>
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
                DATE_FORMAT_OPTIONS,
              )}
            </Typography>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
