import { PaletteMode, createTheme } from "@mui/material";

export const theme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#68B36B",
      },
      secondary: {
        main: "#B368B1",
      },
    },
  });
