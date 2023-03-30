import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { createClient, Entry } from "contentful";
import { VoiceAuthor, PhotoLocation } from "../../shared/content-types";
import { useEffect, useState } from "react";

export const SimpleSearch: React.FC = () => {
  const [
    reset,
    addPhotoLocations,
    addJapaneseAuthorNames,
    addEnglishAuthorNames,
  ] = useStore((state) => [
    state.reset,
    state.addPhotoLocations,
    state.addJapaneseAuthorNames,
    state.addEnglishAuthorNames,
  ]);
  const navigate = useNavigate();
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY,
  });
  const [photoLocations, setPhotoLocations] = useState<
    Entry<PhotoLocation>[] | undefined
  >();
  const [voiceAuthors, setVoiceAuthors] = useState<
    Entry<VoiceAuthor>[] | undefined
  >();

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

  return (
    <Box
      width="250px"
      height="250px"
      marginLeft="auto"
      marginRight="auto"
      paddingTop="1rem"
    >
      <Stack spacing={2}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => reset()}>
            Clear
          </Button>
          <Button variant="outlined" onClick={() => navigate("/search")}>
            Search
          </Button>
        </Stack>
        <Stack spacing={2}>
          <Autocomplete
            multiple
            id="photo-locations"
            limitTags={2}
            options={photoLocationOptions}
            sx={{ width: 300 }}
            onChange={(_event, value) => addPhotoLocations(value)}
            renderInput={(params) => (
              <TextField {...params} label="Photo Location" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[]}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Date of Photo" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[]}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Date of Voice" />
            )}
          />
          <Autocomplete
            multiple
            disablePortal
            id="author-names"
            limitTags={2}
            options={authorNameOptions}
            sx={{ width: 300 }}
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
              <TextField {...params} label="Author/Photographer Name" />
            )}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
