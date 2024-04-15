import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/store";
import { useState } from "react";
import {
  DateLogicalOperators,
  LogicalOperators,
  DATE_FORMAT_OPTIONS,
} from "../../../shared/utilities";
import { getSearchTextConstants } from "../constants";

enum SearchCriteriaType {
  Location,
  Name,
  Date,
}

interface Props {
  photoLocationOptions: string[];
  authorNameOptions: string[];
}

export const AdvancedSearch: React.FC<Props> = (props) => {
  const { photoLocationOptions, authorNameOptions } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const [addPhotoLocations, addAuthorNames, addPhotoDate, reset, languageMode] =
    useStore((state) => [
      state.addPhotoLocations,
      state.addAuthorNames,
      state.addPhotoDate,
      state.reset,
      state.languageMode,
    ]);

  const [photoLocation, setPhotoLocation] = useState("");

  const [photoLocationCriteriaVerbiage, setPhotoLocationCriteriaVerbiage] =
    useState<string[]>([]);

  const [photoDateCriteriaVerbiage, setPhotoDateCriteriaVerbiage] = useState<
    string[]
  >([]);

  const [name, setName] = useState("");

  const [nameCriteriaVerbiage, setNameCriteriaVerbiage] = useState<string[]>(
    []
  );

  const [photoLocationSearchOperator, setPhotoLocationSearchOperator] =
    useState<LogicalOperators>(LogicalOperators.And);

  const [photoDateSearchOperator, setPhotoDateSearchOperator] =
    useState<DateLogicalOperators>(DateLogicalOperators.Before);

  const [nameSearchOperator, setNameSearchOperator] =
    useState<LogicalOperators>(LogicalOperators.And);

  const handlePhotoLocationSearchOperatorChange = (
    event: SelectChangeEvent
  ) => {
    setPhotoLocationSearchOperator(event.target.value as LogicalOperators);
  };

  const handlePhotoDateSearchOperatorChange = (event: SelectChangeEvent) => {
    setPhotoDateSearchOperator(event.target.value as DateLogicalOperators);
  };

  const handleNameSearchOperatorChange = (event: SelectChangeEvent) => {
    setNameSearchOperator(event.target.value as LogicalOperators);
  };

  const handleRemoveSearchCriteria = () => {
    setPhotoLocationCriteriaVerbiage([]);
    setNameCriteriaVerbiage([]);
    setPhotoDateCriteriaVerbiage([]);
    reset();
  };

  const [photoDate, setPhotoDate] = useState<Date | null>();

  const handleAddSearchCriteria = (fieldType: SearchCriteriaType) => {
    let newCriteria = "";
    switch (fieldType) {
      case SearchCriteriaType.Location:
        switch (photoLocationSearchOperator) {
          case LogicalOperators.And:
            newCriteria += "DOES contain";
            break;
          case LogicalOperators.Or:
            newCriteria += "OR contains";
            break;
          case LogicalOperators.Not:
            newCriteria += "does NOT contain";
            break;
          default:
            newCriteria += "INVALID";
            break;
        }
        newCriteria += " " + photoLocation;
        setPhotoLocationCriteriaVerbiage([
          ...photoLocationCriteriaVerbiage,
          newCriteria,
        ]);
        addPhotoLocations([
          { value: photoLocation, operator: photoLocationSearchOperator },
        ]);
        break;
      case SearchCriteriaType.Name:
        switch (nameSearchOperator) {
          case LogicalOperators.And:
            newCriteria += "DOES contain";
            break;
          case LogicalOperators.Or:
            newCriteria += "OR contains";
            break;
          case LogicalOperators.Not:
            newCriteria += "does NOT contain";
            break;
          default:
            newCriteria += "INVALID";
            break;
        }
        newCriteria += " " + name;
        setNameCriteriaVerbiage([...nameCriteriaVerbiage, newCriteria]);
        addAuthorNames([{ value: name, operator: nameSearchOperator }]);
        break;
      case SearchCriteriaType.Date:
        switch (photoDateSearchOperator) {
          case DateLogicalOperators.Before:
            newCriteria += "BEFORE";
            break;
          case DateLogicalOperators.After:
            newCriteria += "AFTER";
            break;
        }
        newCriteria +=
          " " +
          photoDate?.toLocaleDateString(
            languageMode === "ja" ? "ja-JP" : "en-US",
            DATE_FORMAT_OPTIONS
          );

        setPhotoDateCriteriaVerbiage([
          ...photoDateCriteriaVerbiage,
          newCriteria,
        ]);
        photoDate &&
          addPhotoDate([
            {
              value: photoDate,
              operator: photoDateSearchOperator,
            },
          ]);
        break;
      default:
        break;
    }
  };

  const { searchText, photoLocationText, dateOfPhotoText, authorNameText } =
    getSearchTextConstants(languageMode);

  return (
    <Box
      // width="auto"
      // height="500px"
      display="flex"
      justifyContent="center"
      paddingTop="1rem"
      paddingBottom="1rem"
      color={theme.palette.text.primary}
    >
      <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
        <Stack spacing={2} alignItems={{ xs: "flex-start", md: "flex-end" }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <Typography>{photoLocationText}</Typography>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="photo-location-search-operator-select">
                  Operator
                </InputLabel>
                <Select
                  labelId="photo-location-search-operator-select"
                  value={photoLocationSearchOperator}
                  label="Operator"
                  onChange={handlePhotoLocationSearchOperatorChange}
                >
                  <MenuItem value={LogicalOperators.And}>And</MenuItem>
                  <MenuItem value={LogicalOperators.Or}>Or</MenuItem>
                  <MenuItem value={LogicalOperators.Not}>Not</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Autocomplete
              id="photo-locations"
              options={photoLocationOptions}
              sx={{ width: { xs: 300, md: 480 } }}
              onChange={(_event, value) => value && setPhotoLocation(value)}
              renderInput={(params) => (
                <TextField {...params} label={photoLocationText} />
              )}
            />
            <Button
              variant="contained"
              disabled={!photoLocation || !photoLocationSearchOperator}
              onClick={() =>
                handleAddSearchCriteria(SearchCriteriaType.Location)
              }
            >
              Add
            </Button>
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <Typography>{dateOfPhotoText}</Typography>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="photo-date-search-operator-select">
                  Operator
                </InputLabel>
                <Select
                  labelId="photo-date-search-operator-select"
                  value={photoDateSearchOperator}
                  label="Operator"
                  onChange={handlePhotoDateSearchOperatorChange}
                >
                  <MenuItem value={DateLogicalOperators.Before}>
                    Before
                  </MenuItem>
                  <MenuItem value={DateLogicalOperators.After}>After</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={dateOfPhotoText}
                views={["month", "year"]}
                // TODO: find a better type here
                onChange={(value: any) => setPhotoDate(value.$d)}
                disableFuture
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              disabled={!photoDate || !photoDateSearchOperator}
              onClick={() => handleAddSearchCriteria(SearchCriteriaType.Date)}
            >
              Add
            </Button>
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <Typography>{authorNameText}</Typography>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="name-search-operator-select">
                  Operator
                </InputLabel>
                <Select
                  labelId="name-search-operator-select"
                  value={nameSearchOperator}
                  label="Operator"
                  onChange={handleNameSearchOperatorChange}
                >
                  <MenuItem value={LogicalOperators.And}>And</MenuItem>
                  <MenuItem value={LogicalOperators.Or}>Or</MenuItem>
                  <MenuItem value={LogicalOperators.Not}>Not</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Autocomplete
              disablePortal
              id="author-names"
              options={authorNameOptions}
              sx={{ width: { xs: 300, md: 480 } }}
              onChange={(_event, value) => {
                setName(value ?? "");
              }}
              renderInput={(params) => (
                <TextField {...params} label={authorNameText} />
              )}
            />
            <Button
              variant="contained"
              disabled={!name || !nameSearchOperator}
              onClick={() => handleAddSearchCriteria(SearchCriteriaType.Name)}
            >
              Add
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Button variant="outlined" onClick={handleRemoveSearchCriteria}>
            Remove All Conditions
          </Button>
          <Typography variant="h6">Search Criteria</Typography>
          {photoLocationCriteriaVerbiage.length ||
          nameCriteriaVerbiage.length ||
          photoDateCriteriaVerbiage.length ? (
            <Typography component="span" variant="body1">
              {photoLocationCriteriaVerbiage.length ? (
                <ul>
                  <li>{photoLocationText}:</li>
                  <ul>
                    {photoLocationCriteriaVerbiage.map((string, index) => (
                      <li key={index}>{string}</li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <></>
              )}
              {photoDateCriteriaVerbiage.length ? (
                <ul>
                  <li>{dateOfPhotoText}</li>
                  <ul>
                    {photoDateCriteriaVerbiage.map((string, index) => (
                      <li key={index}>{string}</li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <></>
              )}
              {nameCriteriaVerbiage.length ? (
                <ul>
                  <li>{authorNameText}:</li>
                  <ul>
                    {nameCriteriaVerbiage.map((string, index) => (
                      <li key={index}>{string}</li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <></>
              )}
            </Typography>
          ) : (
            <Typography variant="caption">None yet.</Typography>
          )}
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="outlined" onClick={() => navigate("/display")}>
              {searchText}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
