import { Entry } from "contentful";
import React, { useEffect, useState } from "react";
import { VoiceEntry } from "../../shared/content-types";
import { Box, Grid, Typography } from "@mui/material";
import { EntryPreview } from "../entry-preview/entry-preview";
import { useStore } from "../../store/store";
import { getClient } from "../../services/contentful/client";
import { LoadingIndicator } from "../loading-indicator/loading-indicator";
import { LogicalOperators, SearchState } from "../../shared/utilities";

export const IconDisplay: React.FC = () => {
  const searchState = useStore((state) => state.searchState);
  const photoLocations = useStore((state) => state.photoLocations);
  const englishAuthorNames = useStore((state) => state.englishAuthorNames);
  const photoStartDate = useStore((state) => state.photoStartDate);
  const photoEndDate = useStore((state) => state.photoEndDate);
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

    switch (searchState) {
      case SearchState.Simple:
        voiceEntries?.forEach((entry) => {
          const photoLocationFields = entry.fields.photoLocation.fields;
          const photoDate = new Date(entry.fields.photoDate);
          const authorNameFields = entry.fields.voiceAuthor.fields;

          const hasMatchingLocation = photoLocations.every((location) => {
            return (
              location.operator === LogicalOperators.None &&
              (photoLocationFields.photoPrefecture.includes(location.value) ||
                photoLocationFields.photoCity?.includes(location.value))
            );
          });

          const isWithinDateRange =
            photoStartDate &&
            photoEndDate &&
            photoDate.getFullYear() > photoStartDate.value.getFullYear() &&
            photoDate.getFullYear() < photoEndDate.value.getFullYear() &&
            (photoDate.getFullYear() === photoEndDate.value.getFullYear()
              ? photoDate.getMonth() >= photoStartDate.value.getMonth()
              : true);

          const hasMatchingAuthor =
            englishAuthorNames.length !== 0
              ? englishAuthorNames.some((name) => {
                  return (
                    name.operator === LogicalOperators.None &&
                    authorNameFields.englishName === name.value
                  );
                })
              : true;

          if (
            hasMatchingLocation !== false &&
            isWithinDateRange !== false &&
            hasMatchingAuthor !== false
          ) {
            tempFilteredVoiceEntries.push(entry);
          }
        });
        break;
      case SearchState.Advanced:
        break;
      default:
        break;
    }

    // if store is empty use voiceEntries as "default", else use filtered entries list
    if (
      !englishAuthorNames.length &&
      !photoStartDate &&
      !photoEndDate &&
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
    photoStartDate,
    photoEndDate,
  ]);

  if (voiceEntries === undefined) {
    return <LoadingIndicator />;
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
        <Box
          display="flex"
          flexDirection="column"
          paddingTop="1rem"
          paddingLeft="15rem"
          paddingRight="15rem"
          alignItems="center"
        >
          <Typography variant="body1">
            検索結果がありません。ご検索条件を変更して、再試行してください。
          </Typography>
          <Typography variant="body1">
            No voices found for your search parameters. Please alter your search
            and try again.
          </Typography>
        </Box>
      )}
    </>
  );
};
