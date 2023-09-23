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
  dateFormatOptions,
} from "../../../shared/utilities";

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
  const [
    addPhotoLocations,
    addJapaneseAuthorNames,
    addEnglishAuthorNames,
    addPhotoDate,
    reset,
  ] = useStore((state) => [
    state.addPhotoLocations,
    state.addJapaneseAuthorNames,
    state.addEnglishAuthorNames,
    state.addPhotoDate,
    state.reset,
  ]);

  const [photoLocation, setPhotoLocation] = useState("");

  const [photoLocationCriteriaVerbiage, setPhotoLocationCriteriaVerbiage] =
    useState<string[]>([]);

  const [photoDateCriteriaVerbiage, setPhotoDateCriteriaVerbiage] = useState<
    string[]
  >([]);

  const [englishName, setEnglishName] = useState("");
  const [japaneseName, setJapaneseName] = useState("");

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
        newCriteria += " " + japaneseName + "・" + englishName;
        setNameCriteriaVerbiage([...nameCriteriaVerbiage, newCriteria]);
        addJapaneseAuthorNames([
          { value: japaneseName, operator: nameSearchOperator },
        ]);
        addEnglishAuthorNames([
          { value: englishName, operator: nameSearchOperator },
        ]);
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
          " " + photoDate?.toLocaleDateString("en-US", dateFormatOptions);

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

  return (
    <Box
      width="auto"
      height="500px"
      display="flex"
      justifyContent="center"
      paddingTop="1rem"
    >
      <Stack spacing={2} direction="row">
        <Stack spacing={2} alignItems="flex-end">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>撮影場所・Photo Location</Typography>
            <Box sx={{ minWidth: 120 }}>
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
              sx={{ width: 480 }}
              onChange={(_event, value) => value && setPhotoLocation(value)}
              renderInput={(params) => (
                <TextField {...params} label="撮影場所・Photo Location" />
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
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>撮影年月・Date of Photo</Typography>
            <Box sx={{ minWidth: 120 }}>
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
                label={"撮影年月・Date of Photo"}
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
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>撮影者・筆者名・Author/Photographer Name</Typography>
            <Box sx={{ minWidth: 120 }}>
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
              sx={{ width: 480 }}
              onChange={(_event, value) => {
                const namePair = (value ?? "").split("・");
                setJapaneseName(namePair[0]);
                setEnglishName(namePair[1]);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="撮影者・筆者名・Author/Photographer Name"
                />
              )}
            />
            <Button
              variant="contained"
              // only need to check englishName OR japaneseName
              disabled={!englishName || !nameSearchOperator}
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
                  <li>撮影場所・Photo Location:</li>
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
                  <li>撮影年月・Date of Photo</li>
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
                  <li>撮影者・筆者名・Author/Photographer Name:</li>
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
            <Button variant="outlined" onClick={() => navigate("/icon")}>
              検索・Search
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
