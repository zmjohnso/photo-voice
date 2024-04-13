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
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { theme } from "./shared/theme";
import { useStore } from "./store/store";
import { useMemo } from "react";
import { Locale } from "./shared/utilities";

const router = (languageMode: Locale) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: async () => {
            const entry = await HomeLoader(languageMode);
            return entry;
          },
        },
        {
          path: "search",
          element: <Search />,
          loader: async () => {
            const entry = await SearchLoader(languageMode);
            return entry;
          },
        },
        {
          path: "about",
          element: <About />,
          loader: async () => {
            const entry = await AboutLoader(languageMode);
            return entry;
          },
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
  const [colorMode, setColorMode, languageMode, setLanguageMode] = useStore(
    (state) => [
      state.colorMode,
      state.setColorMode,
      state.languageMode,
      state.setLanguageMode,
    ]
  );

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useMemo(() => {
    setColorMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode, setColorMode]);

  const currentLanguage = navigator.language;
  useMemo(() => {
    const japanese = ["ja", "ja-JP"];
    // default to English if user is not using Japanese
    setLanguageMode(japanese.includes(currentLanguage) ? "ja" : "en-US");
  }, [currentLanguage, setLanguageMode]);

  return (
    <ThemeProvider theme={theme(colorMode)}>
      <RouterProvider router={router(languageMode)} />
    </ThemeProvider>
  );
}

export default App;
