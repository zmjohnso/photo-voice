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

enum LogicalOperators {
  And = "AND",
  Or = "OR",
  Not = "NOT",
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
    addPhotoEndDate,
  ] = useStore((state) => [
    state.addPhotoLocations,
    state.photoLocations,
    state.addJapaneseAuthorNames,
    state.japaneseAuthorNames,
    state.addEnglishAuthorNames,
    state.englishAuthorNames,
    state.addPhotoStartDate,
    state.addPhotoEndDate,
  ]);

  const [photoLocationCriteria, setPhotoLocationCriteria] = useState<string[]>(
    []
  );

  const [nameCriteria, setNameCriteria] = useState<string[]>([]);

  const [photoLocationSearchOperator, setPhotoLocationSearchOperator] =
    useState("");

  const [nameSearchOperator, setNameSearchOperator] = useState("");

  const handlePhotoLocationSearchOperatorChange = (
    event: SelectChangeEvent
  ) => {
    setPhotoLocationSearchOperator(event.target.value as LogicalOperators);
  };

  const handleNameSearchOperatorChange = (event: SelectChangeEvent) => {
    setNameSearchOperator(event.target.value as LogicalOperators);
  };

  const handleAddLocationOrNameSearchCriteria = (fieldType: string) => {
    let newCriteria = "";
    switch (fieldType) {
      case "location":
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
      case "name":
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
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="outlined" onClick={() => navigate("/icon")}>
              検索・Search
            </Button>
          </Stack>
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
              onClick={() => handleAddLocationOrNameSearchCriteria("location")}
            >
              Add
            </Button>
          </Stack>
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
              onClick={() => handleAddLocationOrNameSearchCriteria("name")}
            >
              Add
            </Button>
          </Stack>
        </Stack>
        <Box>
          <Typography variant="h5">Search Criteria</Typography>
          <Typography variant="h6">
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
        </Box>
      </Stack>
    </Box>
  );
};
