import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About } from "./components/about/about";
import { PhotoVoiceAppBar } from "./components/app-bar/app-bar";
import { Contact } from "./components/contact/contact";
import { EntryDisplay } from "./components/entry-display/entry-display";
import { IconDisplay } from "./components/icon-display/icon-display";
import { AboutLoader } from "./loaders/about-loader";
import { HomeLoader } from "./loaders/home-loader";
import { SearchLoader } from "./loaders/search-loader";
import ErrorPage from "./routes/error-page";
import { Search } from "./components/search/search";
import { Home } from "./components/home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PhotoVoiceAppBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: HomeLoader,
      },
      {
        path: "search",
        element: <Search />,
        loader: SearchLoader,
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
