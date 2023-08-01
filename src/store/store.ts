import { create } from "zustand";
import { VoiceEntry } from "../shared/content-types";
import { Entry } from "contentful";
import { DateData, NameOrLocationData, SearchState } from "../shared/utilities";

interface State {
  photoLocations: NameOrLocationData[];
  japaneseAuthorNames: NameOrLocationData[];
  englishAuthorNames: NameOrLocationData[];
  photoStartDate: DateData | null;
  photoEndDate: DateData | null;
  currentEntry: Entry<VoiceEntry> | null;
  searchState: SearchState;
}

interface Action {
  addPhotoLocations: (locations: NameOrLocationData[]) => void;
  addJapaneseAuthorNames: (names: NameOrLocationData[]) => void;
  addEnglishAuthorNames: (names: NameOrLocationData[]) => void;
  addPhotoStartDate: (date: DateData) => void;
  addPhotoEndDate: (date: DateData) => void;
  addCurrentEntry: (entry: Entry<VoiceEntry>) => void;
  setSearchState: (state: SearchState) => void;
  reset: () => void;
}

const initialState: State = {
  photoLocations: [],
  japaneseAuthorNames: [],
  englishAuthorNames: [],
  photoStartDate: null,
  photoEndDate: null,
  currentEntry: null,
  searchState: SearchState.None,
};

export const useStore = create<State & Action>()((set) => ({
  photoLocations: [],
  addPhotoLocations: (locations) =>
    set(() => ({
      photoLocations: locations,
    })),
  japaneseAuthorNames: [],
  addJapaneseAuthorNames: (names) =>
    set(() => ({
      japaneseAuthorNames: names,
    })),
  englishAuthorNames: [],
  addEnglishAuthorNames: (names) =>
    set(() => ({
      englishAuthorNames: names,
    })),
  photoStartDate: null,
  addPhotoStartDate: (date) =>
    set(() => ({
      photoStartDate: date,
    })),
  photoEndDate: null,
  addPhotoEndDate: (date) =>
    set(() => ({
      photoEndDate: date,
    })),
  voiceStartDate: null,
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
  reset: () => {
    set(initialState);
  },
}));
