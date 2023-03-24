import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useStore } from "../store/store";

export const SimpleSearch: React.FC = () => {
  const [photoLocations, addPhotoLocations] = useStore((state) => [
    state.photoLocations,
    state.addPhotoLocations,
  ]);

  const photoLocationsList = ["Fukushima Prefecture"];
  const contributorNames = ["name1", "name2", "name3"];

  return (
    <Box>
      <Stack spacing={2} direction="row">
        <TextField id="outlined-basic" variant="outlined" />
        <Button variant="outlined">Search</Button>
      </Stack>
      <Stack spacing={2} direction="column">
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={photoLocationsList}
          sx={{ width: 300 }}
          onChange={(_event, value) => addPhotoLocations(value)}
          renderInput={(params) => (
            <TextField {...params} label="Photo Location" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={photoLocationsList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Date of Photo" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={photoLocationsList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Date of Voice" />
          )}
        />
        <Autocomplete
          multiple
          disablePortal
          id="combo-box-demo"
          options={contributorNames}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Name of Contributor" />
          )}
        />
      </Stack>
    </Box>
    // <Autocomplete
    //   multiple
    //   id="tags-standard"
    //   options={keywords}
    //   onChange={(event, value) => props.setSelectedKeywords(value)}
    //   // getOptionLabel={keywords}
    //   // defaultValue={[top100Films[13]]}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       variant="standard"
    //       label="Tags"
    //       placeholder="Example Tag"
    //     />
    //   )}
    // />
  );
};
