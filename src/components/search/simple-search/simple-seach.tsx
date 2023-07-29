import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useStore } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { LoadingIndicator } from "../../loading-indicator/loading-indicator";

// make date pickers readable for Japanese speakers
// eventually allow the date selection for English and Japanes
// once site language selection is enabled
import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

interface Props {
  photoLocationOptions: string[];
  authorNameOptions: string[];
}

export const SimpleSearch: React.FC<Props> = (props) => {
  const { photoLocationOptions, authorNameOptions } = props;
  const [
    addPhotoLocations,
    addJapaneseAuthorNames,
    addEnglishAuthorNames,
    addPhotoStartDate,
    photoStartDate,
    addPhotoEndDate,
    photoEndDate,
  ] = useStore((state) => [
    state.addPhotoLocations,
    state.addJapaneseAuthorNames,
    state.addEnglishAuthorNames,
    state.addPhotoStartDate,
    state.photoStartDate,
    state.addPhotoEndDate,
    state.photoEndDate,
  ]);
  const navigate = useNavigate();

  if (!photoLocationOptions.length || !authorNameOptions.length) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      width="500px"
      height="500px"
      marginLeft="auto"
      marginRight="auto"
      paddingTop="1rem"
    >
      <Stack spacing={2}>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button variant="outlined" onClick={() => navigate("/icon")}>
            検索・Search
          </Button>
        </Stack>
        <Stack spacing={2}>
          <Autocomplete
            id="photo-locations"
            options={photoLocationOptions}
            sx={{ width: 480 }}
            onChange={(_event, value) => value && addPhotoLocations([value])}
            renderInput={(params) => (
              <TextField {...params} label="撮影場所・Photo Location" />
            )}
          />
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
                maxDate={dayjs(photoEndDate)}
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
                minDate={dayjs(photoStartDate)}
              />
            </LocalizationProvider>
          </Stack>
          <Autocomplete
            disablePortal
            id="author-names"
            options={authorNameOptions}
            sx={{ width: 480 }}
            onChange={(_event, value) => {
              if (value) {
                const namePair = value.split("・");
                addJapaneseAuthorNames([namePair[0]]);
                addEnglishAuthorNames([namePair[1]]);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="撮影者・筆者名・Author/Photographer Name"
              />
            )}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
