import { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { SimpleSearch } from "./simple-search/simple-seach";
import { useStore } from "../../store/store";
import { useShallow } from "zustand/shallow";
import { AdvancedSearch } from "./advanced-search/advanced-search";
import { SearchState } from "../../shared/utilities";
import { useLoaderData } from "react-router-dom";
import { SearchLoaderValue } from "../../loaders/search-loader";

export const Search: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [setSearchState, reset, languageMode] = useStore(
    useShallow((state) => [
      state.setSearchState,
      state.reset,
      state.languageMode,
    ])
  );
  const { photoLocations, voiceAuthors } = useLoaderData() as SearchLoaderValue;

  useEffect(() => {
    // clear store search values on page load
    reset();
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
    ...new Set(voiceAuthors?.map((x) => `${x.fields.name}`)),
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    newValue === 0
      ? setSearchState(SearchState.Simple)
      : setSearchState(SearchState.Advanced);
  };

  const searchTabsEnglish = ["Simple", "Advanced"];
  // get real translations
  const searchTabsJapanese = ["シンプル", "高度"];

  const searchTabs =
    languageMode === "en-US" ? searchTabsEnglish : searchTabsJapanese;

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          aria-label="search tabs"
        >
          {searchTabs.map((tab, index) => (
            <Tab label={tab} id={`search-tab-${index}`} key={index} />
          ))}
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
