import { create } from "zustand";
import { VoiceEntry } from "../shared/content-types";
import { Entry } from "contentful";
import { DateData, NameOrLocationData, SearchState } from "../shared/utilities";
import { PaletteMode } from "@mui/material";

interface State {
  photoLocations: NameOrLocationData[];
  japaneseAuthorNames: NameOrLocationData[];
  englishAuthorNames: NameOrLocationData[];
  photoStartDate: DateData[];
  photoEndDate: DateData[];
  photoDate: DateData[];
  currentEntry: Entry<VoiceEntry> | null;
  searchState: SearchState;
  colorMode: PaletteMode;
}

interface Action {
  addPhotoLocations: (locations: NameOrLocationData[]) => void;
  addJapaneseAuthorNames: (names: NameOrLocationData[]) => void;
  addEnglishAuthorNames: (names: NameOrLocationData[]) => void;
  addPhotoStartDate: (date: DateData[]) => void;
  addPhotoEndDate: (date: DateData[]) => void;
  addPhotoDate: (date: DateData[]) => void;
  addCurrentEntry: (entry: Entry<VoiceEntry>) => void;
  setSearchState: (state: SearchState) => void;
  setColorMode: (mode: PaletteMode) => void;
  reset: () => void;
}

const initialState: State = {
  photoLocations: [],
  japaneseAuthorNames: [],
  englishAuthorNames: [],
  photoStartDate: [],
  photoEndDate: [],
  photoDate: [],
  currentEntry: null,
  searchState: SearchState.None,
  colorMode: "light",
};

export const useStore = create<State & Action>()((set) => ({
  photoLocations: [],
  addPhotoLocations: (locations) =>
    set((state) => ({
      photoLocations: [...state.photoLocations, ...locations],
    })),
  japaneseAuthorNames: [],
  addJapaneseAuthorNames: (names) =>
    set((state) => ({
      japaneseAuthorNames: [...state.japaneseAuthorNames, ...names],
    })),
  englishAuthorNames: [],
  addEnglishAuthorNames: (names) =>
    set((state) => ({
      englishAuthorNames: [...state.englishAuthorNames, ...names],
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
  searchState: SearchState.None,
  setSearchState: (state) =>
    set(() => ({
      searchState: state,
    })),
  colorMode: "light",
  setColorMode: (mode) =>
    set(() => ({
      colorMode: mode,
    })),
  reset: () => {
    set((state) => ({
      ...initialState,
      colorMode: state.colorMode, // retain the current colorMode
    }));
  },
}));
