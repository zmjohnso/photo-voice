import { Entry } from "contentful";
import React, { useEffect, useState } from "react";
import { VoiceEntry } from "../../shared/content-types";
import { Box, Grid, Typography } from "@mui/material";
import { EntryPreview } from "../entry-preview/entry-preview";
import { useStore } from "../../store/store";
import { getClient } from "../../services/contentful/client";
import { LoadingIndicator } from "../loading-indicator/loading-indicator";
import {
  DateLogicalOperators,
  LogicalOperators,
  SearchState,
} from "../../shared/utilities";

export const IconDisplay: React.FC = () => {
  const searchState = useStore((state) => state.searchState);
  const photoLocations = useStore((state) => state.photoLocations);
  const englishAuthorNames = useStore((state) => state.englishAuthorNames);
  const photoStartDate = useStore((state) => state.photoStartDate);
  const photoEndDate = useStore((state) => state.photoEndDate);
  const photoDate = useStore((state) => state.photoDate);
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
            photoStartDate.length &&
            photoEndDate.length &&
            photoDate.getFullYear() > photoStartDate[0].value.getFullYear() &&
            photoDate.getFullYear() < photoEndDate[0].value.getFullYear() &&
            (photoDate.getFullYear() === photoEndDate[0].value.getFullYear()
              ? photoDate.getMonth() >= photoStartDate[0].value.getMonth()
              : true);

          const hasMatchingAuthor = englishAuthorNames.length
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
        voiceEntries?.forEach((entry) => {
          const entryPhotoLocation = entry.fields.photoLocation.fields;
          const entryPhotoDate = new Date(entry.fields.photoDate);
          const entryVoiceAuthor = entry.fields.voiceAuthor.fields;

          const andLocations: string[] = [];
          const orLocations: string[] = [];
          const notLocations: string[] = [];

          const beforeDates: Date[] = [];
          const afterDates: Date[] = [];

          const andAuthors: string[] = [];
          const orAuthors: string[] = [];
          const notAuthors: string[] = [];

          // location logic
          photoLocations.forEach((location) => {
            const hasMatchingLocation =
              entryPhotoLocation.photoPrefecture.includes(location.value) ||
              entryPhotoLocation.photoCity?.includes(location.value);

            switch (location.operator) {
              case LogicalOperators.And:
                hasMatchingLocation && andLocations.push(location.value);
                break;
              case LogicalOperators.Or:
                hasMatchingLocation && orLocations.push(location.value);
                break;
              case LogicalOperators.Not:
                hasMatchingLocation && notLocations.push(location.value);
                break;
              case LogicalOperators.None:
                break;
              default:
                break;
            }
          });

          // photo date logic
          photoDate.length &&
            photoDate.forEach((date) => {
              const d = new Date(date.value);
              switch (date.operator) {
                case DateLogicalOperators.Before:
                  entryPhotoDate < d && beforeDates.push(d);
                  break;
                case DateLogicalOperators.After:
                  entryPhotoDate > d && afterDates.push(d);
                  break;
                case DateLogicalOperators.None:
                  break;
                default:
                  break;
              }
            });

          // author logic
          englishAuthorNames.forEach((name) => {
            switch (name.operator) {
              case LogicalOperators.And:
                entryVoiceAuthor.englishName === name.value &&
                  andAuthors.push(name.value);
                break;
              case LogicalOperators.Or:
                entryVoiceAuthor.englishName === name.value &&
                  orAuthors.push(name.value);
                break;
              case LogicalOperators.Not:
                entryVoiceAuthor.englishName === name.value &&
                  notAuthors.push(name.value);
                break;
              case LogicalOperators.None:
                break;
              default:
                break;
            }
          });

          /***************************** */
          /* Start entry filtering logic */

          const notLocationCheck = !notLocations.includes(
            entry.fields.photoLocation.fields.photoPrefecture ||
              (entry.fields.photoLocation.fields.photoCity ?? "")
          );
          const notAuthorCheck = !notAuthors.includes(
            entry.fields.voiceAuthor.fields.englishName
          );

          const dateCheck = () => {
            if (
              !beforeDates.length &&
              !afterDates.length &&
              !photoDate.length
            ) {
              return true;
            }

            const entryDate = new Date(entry.fields.photoDate);

            const isBefore = beforeDates.some(
              (date) => entryDate < new Date(date)
            );
            const isAfter = afterDates.some(
              (date) => entryDate > new Date(date)
            );

            if (
              !beforeDates.length &&
              beforeDates.length + afterDates.length === photoDate.length
            ) {
              return isAfter;
            }

            if (
              !afterDates.length &&
              beforeDates.length + afterDates.length === photoDate.length
            ) {
              return isBefore;
            }

            return isBefore && isAfter;
          };

          const countOperators = (
            array: { operator: LogicalOperators }[],
            targetOperator: LogicalOperators
          ) => array.filter((item) => item.operator === targetOperator).length;

          const checkAndOperators = (
            count: number,
            items: string[],
            fieldType: "location" | "author"
          ) => {
            if (count === 0) {
              return true;
            } else if (count === 1) {
              if (fieldType === "location") {
                return items.includes(
                  entry.fields.photoLocation.fields.photoPrefecture ||
                    (entry.fields.photoLocation.fields.photoCity ?? "")
                );
              } else if (fieldType === "author") {
                return items.includes(
                  entry.fields.voiceAuthor.fields.englishName
                );
              }
            } else {
              return false;
            }
          };

          const andLocationCount = countOperators(
            photoLocations,
            LogicalOperators.And
          );
          const andLocationCheck = checkAndOperators(
            andLocationCount,
            andLocations,
            "location"
          );

          const orLocationCount = countOperators(
            photoLocations,
            LogicalOperators.Or
          );
          const orLocationCheck =
            orLocationCount === 0
              ? true
              : orLocations.includes(
                  entry.fields.photoLocation.fields.photoPrefecture ||
                    (entry.fields.photoLocation.fields.photoCity ?? "")
                );

          const andAuthorCount = countOperators(
            englishAuthorNames,
            LogicalOperators.And
          );
          const andAuthorCheck = checkAndOperators(
            andAuthorCount,
            andAuthors,
            "author"
          );

          const orAuthorCount = countOperators(
            englishAuthorNames,
            LogicalOperators.Or
          );
          const orAuthorCheck =
            orAuthorCount === 0
              ? true
              : orAuthors.includes(entry.fields.voiceAuthor.fields.englishName);

          /* End entry filtering logic */
          /*************************** */

          if (!notLocationCheck) return;
          if (!notAuthorCheck) return;
          if (!dateCheck()) return;
          if (!andLocationCheck) return;
          if (!andAuthorCheck) return;
          if (!(orLocationCheck || orAuthorCheck)) return;

          tempFilteredVoiceEntries.push(entry);
        });
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
