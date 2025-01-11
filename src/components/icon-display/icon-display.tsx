import { Entry } from "contentful";
import React, { useEffect, useState } from "react";
import { VoiceEntry } from "../../shared/content-types";
import { Box, Grid2 as Grid, Typography, useTheme } from "@mui/material";
import { EntryPreview } from "../entry-preview/entry-preview";
import { useStore } from "../../store/store";
import { useShallow } from "zustand/shallow";
import {
  DateLogicalOperators,
  LogicalOperators,
  SearchState,
} from "../../shared/utilities";
import { useLoaderData } from "react-router";
import { IconDisplayLoaderValue } from "../../loaders/icon-display-loader";

export const IconDisplay: React.FC = () => {
  const [
    searchState,
    photoLocations,
    authorNames,
    photoStartDate,
    photoEndDate,
    photoDate,
    languageMode,
  ] = useStore(
    useShallow((state) => [
      state.searchState,
      state.photoLocations,
      state.authorNames,
      state.photoStartDate,
      state.photoEndDate,
      state.photoDate,
      state.languageMode,
    ])
  );
  const voiceEntries = useLoaderData() as IconDisplayLoaderValue;
  const theme = useTheme();

  const [filteredVoiceEntries, setFilteredVoiceEntries] = useState<
    Entry<VoiceEntry>[] | undefined
  >();

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

          const hasMatchingAuthor = authorNames.length
            ? authorNames.some((name) => {
                return (
                  name.operator === LogicalOperators.None &&
                  authorNameFields.name === name.value
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
          authorNames.forEach((name) => {
            switch (name.operator) {
              case LogicalOperators.And:
                entryVoiceAuthor.name === name.value &&
                  andAuthors.push(name.value);
                break;
              case LogicalOperators.Or:
                entryVoiceAuthor.name === name.value &&
                  orAuthors.push(name.value);
                break;
              case LogicalOperators.Not:
                entryVoiceAuthor.name === name.value &&
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
            entry.fields.voiceAuthor.fields.name
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
                return items.includes(entry.fields.voiceAuthor.fields.name);
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
            authorNames,
            LogicalOperators.And
          );
          const andAuthorCheck = checkAndOperators(
            andAuthorCount,
            andAuthors,
            "author"
          );

          const orAuthorCount = countOperators(
            authorNames,
            LogicalOperators.Or
          );
          const orAuthorCheck =
            orAuthorCount === 0
              ? true
              : orAuthors.includes(entry.fields.voiceAuthor.fields.name);

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
      !authorNames.length &&
      !photoStartDate &&
      !photoEndDate &&
      !photoLocations.length
    ) {
      setFilteredVoiceEntries(voiceEntries);
    } else {
      setFilteredVoiceEntries(tempFilteredVoiceEntries);
    }
  }, [photoLocations, authorNames, voiceEntries, photoStartDate, photoEndDate]);

  return (
    <>
      {filteredVoiceEntries?.length ? (
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Grid container spacing={10} style={{ padding: "24px" }}>
            {filteredVoiceEntries.map((entry) => (
              <Grid
                key={entry.fields.entryId}
                size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
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
          paddingLeft={{ xs: "1rem", md: "15rem" }}
          paddingRight={{ xs: "1rem", md: "15rem" }}
          alignItems="center"
          color={theme.palette.text.primary}
        >
          {languageMode === "en-US" ? (
            <Typography variant="body1">
              No voices found for your search parameters. Please alter your
              search and try again.
            </Typography>
          ) : (
            <Typography variant="body1">
              検索結果がありません。ご検索条件を変更して、再試行してください。
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};
