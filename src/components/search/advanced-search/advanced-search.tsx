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
import { dateFormatOptions } from "../../../shared/utilities";

enum LogicalOperators {
  And = "AND",
  Or = "OR",
  Not = "NOT",
}

enum DateLogicalOperators {
  Before = "BEFORE",
  After = "AFTER",
}

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
    photoLocations,
    addJapaneseAuthorNames,
    japaneseAuthorNames,
    addEnglishAuthorNames,
    englishAuthorNames,
    addPhotoStartDate,
    photoStartDate,
    addPhotoEndDate,
    photoEndDate,
  ] = useStore((state) => [
    state.addPhotoLocations,
    state.photoLocations,
    state.addJapaneseAuthorNames,
    state.japaneseAuthorNames,
    state.addEnglishAuthorNames,
    state.englishAuthorNames,
    state.addPhotoStartDate,
    state.photoStartDate,
    state.addPhotoEndDate,
    state.photoEndDate,
  ]);

  const [photoLocationCriteria, setPhotoLocationCriteria] = useState<string[]>(
    []
  );

  const [photoDateCriteria, setPhotoDateCriteria] = useState<string[]>([]);

  const [nameCriteria, setNameCriteria] = useState<string[]>([]);

  const [photoLocationSearchOperator, setPhotoLocationSearchOperator] =
    useState("");

  const [photoDateSearchOperator, setPhotoDateSearchOperator] = useState("");

  const [nameSearchOperator, setNameSearchOperator] = useState("");

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
    setPhotoLocationCriteria([]);
    setNameCriteria([]);
    setPhotoDateCriteria([]);
  };

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
        newCriteria += " " + photoLocations;
        setPhotoLocationCriteria([...photoLocationCriteria, newCriteria]);
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
        newCriteria += " " + japaneseAuthorNames + "・" + englishAuthorNames;
        setNameCriteria([...nameCriteria, newCriteria]);
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
        if (photoDateSearchOperator == DateLogicalOperators.Before) {
          newCriteria +=
            " " + photoEndDate?.toLocaleDateString("en-US", dateFormatOptions);
        }
        if (photoDateSearchOperator == DateLogicalOperators.After) {
          newCriteria +=
            " " +
            photoStartDate?.toLocaleDateString("en-US", dateFormatOptions);
        }
        setPhotoDateCriteria([...photoDateCriteria, newCriteria]);
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
              onChange={(_event, value) => value && addPhotoLocations([value])}
              renderInput={(params) => (
                <TextField {...params} label="撮影場所・Photo Location" />
              )}
            />
            <Button
              variant="contained"
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
                onChange={(value: any) => {
                  if (photoDateSearchOperator == DateLogicalOperators.Before) {
                    addPhotoEndDate(value.$d);
                  }
                  if (photoDateSearchOperator == DateLogicalOperators.After) {
                    addPhotoStartDate(value.$d);
                  }
                }}
                disableFuture
              />
            </LocalizationProvider>
            <Button
              variant="contained"
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
                const japaneseNames: string[] = [];
                const englishNames: string[] = [];
                const namePair = (value ?? "").split("・");
                japaneseNames.push(namePair[0]);
                englishNames.push(namePair[1]);
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
            <Button
              variant="contained"
              onClick={() => handleAddSearchCriteria(SearchCriteriaType.Name)}
            >
              Add
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Button variant="outlined" onClick={handleRemoveSearchCriteria}>
            Remove All Search Criteria
          </Button>
          <Typography variant="h6">Search Criteria</Typography>
          {photoLocationCriteria.length ||
          nameCriteria.length ||
          photoDateCriteria.length ? (
            <Typography component="span" variant="body1">
              {photoLocationCriteria.length ? (
                <ul>
                  <li>撮影場所・Photo Location:</li>
                  <ul>
                    {photoLocationCriteria.map((string, index) => (
                      <li key={index}>{string}</li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <></>
              )}
              {photoDateCriteria.length ? (
                <ul>
                  <li>撮影年月・Date of Photo</li>
                  <ul>
                    {photoDateCriteria.map((string, index) => (
                      <li key={index}>{string}</li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <></>
              )}
              {nameCriteria.length ? (
                <ul>
                  <li>撮影者・筆者名・Author/Photographer Name:</li>
                  <ul>
                    {nameCriteria.map((string, index) => (
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
