import { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { SimpleSearch } from "./simple-search/simple-seach";
import { useStore } from "../../store/store";
import { AdvancedSearch } from "./advanced-search/advanced-search";
import { Entry } from "contentful";
import { getClient } from "../../services/contentful/client";
import { PhotoLocation, VoiceAuthor } from "../../shared/content-types";

export const Search: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reset] = useStore((state) => [state.reset]);
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

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          aria-label="search tabs"
        >
          <Tab label="Simple" id={"search-tab-0"} />
          <Tab label="Advanced" id={"search-tab-1"} />
        </Tabs>
      </Box>
      {tabValue === 0 && (
        <SimpleSearch
          photoLocationOptions={photoLocationOptions}
          authorNameOptions={authorNameOptions}
        />
      )}
      {tabValue === 1 && (
        <AdvancedSearch
          photoLocationOptions={photoLocationOptions}
          authorNameOptions={authorNameOptions}
        />
      )}
    </Box>
  );
};
