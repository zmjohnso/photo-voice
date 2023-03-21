import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";

interface Props {
  setSelectedKeywords: (keywords: string[]) => void;
}

export const SimpleSearch: React.FC<Props> = (props) => {
  const keywords = ["Tag1", "Tag2", "Tag3"];
  const photoLocations = ["location1", "location2", "location3"];

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
          options={photoLocations}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Photo Location" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={photoLocations}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Date of Photo" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={photoLocations}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Date of Voice" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={photoLocations}
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
