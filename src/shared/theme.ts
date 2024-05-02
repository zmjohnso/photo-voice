import { PaletteMode, createTheme } from "@mui/material";

export const theme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#68b83f",
      },
    },
  });
