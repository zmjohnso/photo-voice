import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./routes/error-page";
import "./index.css";
import { DisplayEntries } from "./services/contentful/content-delivery-api";
import { SimpleSearch } from "./components/simple-seach";

// const [selectedKeywords, setSelectedKeywords] = useState([""]);

// const handleSetSelectedKeywords = (keywords: string[]) => {
//   setSelectedKeywords(keywords);
// };

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
      // {
      //   path: "search",
      //   element: <DisplayEntries />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
