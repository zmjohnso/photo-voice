import { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { SimpleSearch } from "./simple-search/simple-seach";
import { useStore } from "../../store/store";
import { AdvancedSearch } from "./advanced-search/advanced-search";
import { SearchState } from "../../shared/utilities";
import { useLoaderData } from "react-router-dom";
import { SearchLoaderValue } from "../../loaders/search-loader";

export const Search: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [setSearchState, reset] = useStore((state) => [
    state.setSearchState,
    state.reset,
  ]);
  const { photoLocations, voiceAuthors } = useLoaderData() as SearchLoaderValue;

  useEffect(() => {
    // clear store search values on page load
    reset();
    // default to simple search since that is the default tab
    setSearchState(SearchState.Simple);
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
    newValue === 0
      ? setSearchState(SearchState.Simple)
      : setSearchState(SearchState.Advanced);
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
