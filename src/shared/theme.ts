import { PaletteMode } from "@mui/material";

import { createTheme } from "@mui/material/styles";

export const theme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#68b83f",
      },
    },
  });
