import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./routes/error-page";
import "./index.css";
import { IconDisplay } from "./components/icon-display/icon-display";
import { EntryDisplay } from "./components/entry-display/entry-display";
import { About } from "./components/about/about";
import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/theme";
import { Search } from "./components/search/search";
import { Contact } from "./components/contact/contact";
import { AboutLoader } from "./loaders/about-loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "about",
        element: <About />,
        loader: AboutLoader,
      },
      {
        path: "icon",
        element: <IconDisplay />,
      },
      {
        path: "display",
        element: <EntryDisplay />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme("light")}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
