import { Entry } from "contentful";
import React, { useEffect, useState } from "react";
import { VoiceEntry } from "../../shared/content-types";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { EntryPreview } from "../entry-preview/entry-preview";
import { useStore } from "../../store/store";
import { getClient } from "../../services/contentful/client";

export const IconDisplay: React.FC = () => {
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

  const client = getClient();

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
        <Box>
          <Grid container spacing={10} style={{ padding: "24px" }}>
            {filteredVoiceEntries.map((entry) => (
              <Grid
                key={entry.fields.entryId}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
              >
                <EntryPreview entry={entry}></EntryPreview>
              </Grid>
            ))}
          </Grid>
        </Box>
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
