import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Entry } from "contentful";
import { VoiceAuthor, PhotoLocation } from "../../shared/content-types";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getClient } from "../../services/contentful/client";
import { LoadingIndicator } from "../loading-indicator/loading-indicator";

// make date pickers readable for Japanese speakers
// eventually allow the date selection for English and Japanes
// once site language selection is enabled
import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

export const SimpleSearch: React.FC = () => {
  const [
    addPhotoLocations,
    addJapaneseAuthorNames,
    addEnglishAuthorNames,
    addPhotoStartDate,
    addPhotoEndDate,
    reset,
  ] = useStore((state) => [
    state.addPhotoLocations,
    state.addJapaneseAuthorNames,
    state.addEnglishAuthorNames,
    state.addPhotoStartDate,
    state.addPhotoEndDate,
    state.reset,
  ]);
  const navigate = useNavigate();
  const client = getClient();
  const [photoLocations, setPhotoLocations] = useState<
    Entry<PhotoLocation>[] | undefined
  >();
  const [voiceAuthors, setVoiceAuthors] = useState<
    Entry<VoiceAuthor>[] | undefined
  >();

  useEffect(() => {
    // clear store search values on page load
    reset();
  }, []);

  useEffect(() => {
    client
      .getEntries<PhotoLocation>({ content_type: "photoLocation" })
      .then((locations) => setPhotoLocations(locations.items))
      .catch(console.error); // Add error handling

    client
      .getEntries<VoiceAuthor>({ content_type: "author" })
      .then((authors) => setVoiceAuthors(authors.items))
      .catch(console.error); // Add error handling
  }, []);

  const prefectures = [
    ...new Set(
      photoLocations?.map((x) => x.fields.photoPrefecture).filter((x) => x) ??
        []
    ),
  ];
  const cities = [
    ...new Set(
      photoLocations?.map((x) => x.fields.photoCity ?? "").filter((x) => x) ??
        []
    ),
  ];
  const photoLocationOptions = [...prefectures, ...cities];

  const authorNameOptions = [
    ...new Set(
      voiceAuthors?.map(
        (x) => `${x.fields.japaneseName}・${x.fields.englishName}`
      )
    ),
  ];

  if (photoLocations === undefined || voiceAuthors === undefined) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      width="500px"
      height="500px"
      marginLeft="auto"
      marginRight="auto"
      paddingTop="1rem"
    >
      <Stack spacing={2}>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button variant="outlined" onClick={() => navigate("/icon")}>
            検索・Search
          </Button>
        </Stack>
        <Stack spacing={2}>
          <Autocomplete
            multiple
            id="photo-locations"
            limitTags={2}
            options={photoLocationOptions}
            sx={{ width: 480 }}
            onChange={(_event, value) => addPhotoLocations(value)}
            renderInput={(params) => (
              <TextField {...params} label="撮影場所・Photo Location" />
            )}
          />
          <Stack direction="row" spacing={2} sx={{ width: 480 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"撮影年月・Date of Photo"}
                views={["month", "year"]}
                slotProps={{
                  textField: {
                    helperText: "開始日・Start Date",
                  },
                }}
                // TODO: find a better type here
                onChange={(value: any) => {
                  addPhotoStartDate(value.$d);
                }}
                disableFuture
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"撮影年月・Date of Photo"}
                views={["month", "year"]}
                slotProps={{
                  textField: {
                    helperText: "終了日・End Date",
                  },
                }}
                // TODO: find a better type here
                onChange={(value: any) => {
                  addPhotoEndDate(value.$d);
                }}
                disableFuture
              />
            </LocalizationProvider>
          </Stack>
          <Autocomplete
            multiple
            disablePortal
            id="author-names"
            limitTags={2}
            options={authorNameOptions}
            sx={{ width: 480 }}
            onChange={(_event, value) => {
              const japaneseNames: string[] = [];
              const englishNames: string[] = [];
              value.forEach((nameSet) => {
                const namePair = nameSet.split("・");
                japaneseNames.push(namePair[0]);
                englishNames.push(namePair[1]);
              });
              japaneseNames.length && addJapaneseAuthorNames(japaneseNames);
              englishNames.length && addEnglishAuthorNames(englishNames);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="撮影者・筆者名・Author/Photographer Name"
              />
            )}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
