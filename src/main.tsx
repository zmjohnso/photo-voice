import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./routes/error-page";
import "./index.css";
import { SimpleSearch } from "./components/simple-search/simple-seach";
import { IconDisplay } from "./components/icon-display/icon-display";
import { EntryDisplay } from "./components/entry-display/entry-display";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <SimpleSearch />,
      },
      {
        path: "about",
        element: "This is an about page",
      },
      {
        path: "contact",
        element: "This is the contact page",
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
