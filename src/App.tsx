import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About } from "./components/about/about";
import { Layout } from "./components/layout/layout";
import { Contact } from "./components/contact/contact";
import { EntryDisplay } from "./components/entry-display/entry-display";
import { IconDisplay } from "./components/icon-display/icon-display";
import { AboutLoader } from "./loaders/about-loader";
import { HomeLoader } from "./loaders/home-loader";
import { SearchLoader } from "./loaders/search-loader";
import ErrorPage from "./routes/error-page";
import { Search } from "./components/search/search";
import { Home } from "./components/home/home";
import { IconDisplayLoader } from "./loaders/icon-display-loader";
import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/theme";
import { useStore } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        loader: IconDisplayLoader,
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
  const [colorMode] = useStore((state) => [state.colorMode]);

  return (
    <ThemeProvider theme={theme(colorMode)}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
