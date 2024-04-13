import { create } from "zustand";
import { VoiceEntry } from "../shared/content-types";
import { Entry } from "contentful";
import {
  DateData,
  Locale,
  NameOrLocationData,
  SearchState,
} from "../shared/utilities";
import { PaletteMode } from "@mui/material";

interface State {
  photoLocations: NameOrLocationData[];
  authorNames: NameOrLocationData[];
  photoStartDate: DateData[];
  photoEndDate: DateData[];
  photoDate: DateData[];
  currentEntry: Entry<VoiceEntry> | null;
  searchState: SearchState;
  colorMode: PaletteMode;
  languageMode: Locale;
}

interface Action {
  addPhotoLocations: (locations: NameOrLocationData[]) => void;
  addAuthorNames: (names: NameOrLocationData[]) => void;
  addPhotoStartDate: (date: DateData[]) => void;
  addPhotoEndDate: (date: DateData[]) => void;
  addPhotoDate: (date: DateData[]) => void;
  addCurrentEntry: (entry: Entry<VoiceEntry>) => void;
  setSearchState: (state: SearchState) => void;
  setColorMode: (mode: PaletteMode) => void;
  setLanguageMode: (mode: Locale) => void;
  reset: () => void;
}

const initialState: State = {
  photoLocations: [],
  authorNames: [],
  photoStartDate: [],
  photoEndDate: [],
  photoDate: [],
  currentEntry: null,
  searchState: SearchState.Simple,
  colorMode: "light",
  languageMode: "en-US",
};

export const useStore = create<State & Action>()((set) => ({
  photoLocations: [],
  addPhotoLocations: (locations) =>
    set((state) => ({
      photoLocations: [...state.photoLocations, ...locations],
    })),
  authorNames: [],
  addAuthorNames: (names) =>
    set((state) => ({
      authorNames: [...state.authorNames, ...names],
    })),
  photoStartDate: [],
  addPhotoStartDate: (date) =>
    set((state) => ({
      photoStartDate: [...state.photoStartDate, ...date],
    })),
  photoEndDate: [],
  addPhotoEndDate: (date) =>
    set((state) => ({
      photoEndDate: [...state.photoEndDate, ...date],
    })),
  photoDate: [],
  addPhotoDate: (date) =>
    set((state) => ({
      photoDate: [...state.photoDate, ...date],
    })),
  currentEntry: null,
  addCurrentEntry: (entry) =>
    set(() => ({
      currentEntry: entry,
    })),
  searchState: SearchState.Simple,
  setSearchState: (state) =>
    set(() => ({
      searchState: state,
    })),
  colorMode: "light",
  setColorMode: (mode) =>
    set(() => ({
      colorMode: mode,
    })),
  languageMode: "en-US",
  setLanguageMode: (mode) =>
    set(() => ({
      languageMode: mode,
    })),
  reset: () => {
    set((state) => ({
      ...initialState,
      // retain the current colorMode and languageMode
      colorMode: state.colorMode,
      languageMode: state.languageMode,
    }));
  },
}));
