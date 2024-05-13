import { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { SimpleSearch } from "./simple-search/simple-seach";
import { useStore } from "../../store/store";
import { AdvancedSearch } from "./advanced-search/advanced-search";
import { SearchState } from "../../shared/utilities";
import { useLoaderData } from "react-router-dom";
import { SearchLoaderValue } from "../../loaders/search-loader";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export const Search: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [setSearchState, reset, languageMode] = useStore((state) => [
    state.setSearchState,
    state.reset,
    state.languageMode,
  ]);
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

  const searchTabsEnglish = ["Simple", "Advanced", "Map"];
  // get real translations
  const searchTabsJapanese = ["シンプル", "高度", "地図"];

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
      {tabValue === 2 && (
        <MapContainer
          center={[35.6761919, 139.6503106]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "80vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </Box>
  );
};
