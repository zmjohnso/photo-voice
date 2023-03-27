import { create } from "zustand";

interface State {
  photoLocations: string[];
  japaneseAuthorNames: string[];
  englishAuthorNames: string[];
}

interface Action {
  addPhotoLocations: (locations: string[]) => void;
  addJapaneseAuthorNames: (names: string[]) => void;
  addEnglishAuthorNames: (names: string[]) => void;
  reset: () => void;
}

// define the initial state
const initialState: State = {
  photoLocations: [],
  japaneseAuthorNames: [],
  englishAuthorNames: [],
};

export const useStore = create<State & Action>((set) => ({
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
  reset: () => {
    set(initialState);
  },
}));
