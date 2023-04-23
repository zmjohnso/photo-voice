import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./routes/error-page";
import "./index.css";
import { SimpleSearch } from "./components/simple-search/simple-seach";
import { IconDisplay } from "./components/icon-display/icon-display";
import { EntryDisplay } from "./components/entry-display/entry-display";
import { About } from "./components/about/about";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
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
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "search",
        element: <SimpleSearch />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "icon",
        element: <IconDisplay />,
      },
      {
        path: "display",
        element: <EntryDisplay />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
