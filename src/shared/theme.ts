import { PaletteMode, createTheme } from "@mui/material";

export const theme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              light: "#68b36b",
              main: "#43a047",
              dark: "#2e7031",
              contrastText: "white",
            },
            secondary: {
              light: "#b368af",
              main: "#a0439b",
              dark: "#702e6c",
              contrastText: "white",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              light: "#68b36b",
              main: "#43a047",
              dark: "#2e7031",
              contrastText: "white",
            },
            secondary: {
              light: "#b368af",
              main: "#a0439b",
              dark: "#702e6c",
              contrastText: "white",
            },
          }),
    },
  });
