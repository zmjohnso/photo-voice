import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useStore } from "../../../store/store";
import { useShallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import {
  DateLogicalOperators,
  LogicalOperators,
} from "../../../shared/utilities";
import { getSearchTextConstants } from "../constants";

interface Props {
  photoLocationOptions: string[];
  authorNameOptions: string[];
}

export const SimpleSearch: React.FC<Props> = (props) => {
  const { photoLocationOptions, authorNameOptions } = props;
  const [
    addPhotoLocations,
    addAuthorNames,
    addPhotoStartDate,
    photoStartDate,
    addPhotoEndDate,
    photoEndDate,
    languageMode,
  ] = useStore(
    useShallow((state) => [
      state.addPhotoLocations,
      state.addAuthorNames,
      state.addPhotoStartDate,
      state.photoStartDate,
      state.addPhotoEndDate,
      state.photoEndDate,
      state.languageMode,
    ])
  );
  const navigate = useNavigate();

  // this is not ideal as it doesn't update the date picker except on page reload
  // ideally the user would be able to switch between languages and see the date picker update
  useEffect(() => {
    languageMode === "ja" && dayjs.locale("ja");
  }, [languageMode]);

  const {
    searchText,
    photoLocationText,
    dateOfPhotoText,
    authorNameText,
    startDateText,
    endDateText,
  } = getSearchTextConstants(languageMode);

  return (
    <Box marginLeft="auto" marginRight="auto" paddingTop="1rem">
      <Stack spacing={2}>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button variant="outlined" onClick={() => navigate("/display")}>
            {searchText}
          </Button>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Autocomplete
            id="photo-locations"
            options={photoLocationOptions}
            sx={{ width: { xs: 300, md: 480 } }}
            onChange={(_event, value) =>
              value &&
              addPhotoLocations([
                {
                  value: value,
                  operator: LogicalOperators.None,
                },
              ])
            }
            renderInput={(params) => (
              <TextField {...params} label={photoLocationText} />
            )}
          />
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ width: { xs: 300, md: 480 } }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={dateOfPhotoText}
                // how to localize these views?
                views={["month", "year"]}
                slotProps={{
                  textField: {
                    helperText: startDateText,
                  },
                }}
                // TODO: find a better type here
                onChange={(value: any) => {
                  addPhotoStartDate([
                    {
                      value: value.$d,
                      operator: DateLogicalOperators.None,
                    },
                  ]);
                }}
                disableFuture
                maxDate={
                  photoEndDate.length ? dayjs(photoEndDate[0].value) : null
                }
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={dateOfPhotoText}
                views={["month", "year"]}
                slotProps={{
                  textField: {
                    helperText: endDateText,
                  },
                }}
                // TODO: find a better type here
                onChange={(value: any) => {
                  addPhotoEndDate([
                    {
                      value: value.$d,
                      operator: DateLogicalOperators.None,
                    },
                  ]);
                }}
                disableFuture
                minDate={
                  photoStartDate.length ? dayjs(photoStartDate[0].value) : null
                }
              />
            </LocalizationProvider>
          </Stack>
          <Autocomplete
            disablePortal
            id="author-names"
            options={authorNameOptions}
            sx={{ width: { xs: 300, md: 480 } }}
            onChange={(_event, value) => {
              if (value) {
                addAuthorNames([
                  {
                    value: value,
                    operator: LogicalOperators.None,
                  },
                ]);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label={authorNameText} />
            )}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
