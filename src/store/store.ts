import { create } from "zustand";

interface State {
  photoLocations: string[];
  japaneseAuthorNames: string[];
  englishAuthorNames: string[];
  photoStartDate: Date | null;
  photoEndDate: Date | null;
  voiceStartDate: Date | null;
  voiceEndDate: Date | null;
}

interface Action {
  addPhotoLocations: (locations: string[]) => void;
  addJapaneseAuthorNames: (names: string[]) => void;
  addEnglishAuthorNames: (names: string[]) => void;
  addPhotoStartDate: (date: Date) => void;
  addPhotoEndDate: (date: Date) => void;
  addVoiceStartDate: (date: Date) => void;
  addVoiceEndDate: (date: Date) => void;
  reset: () => void;
}

// define the initial state
const initialState: State = {
  photoLocations: [],
  japaneseAuthorNames: [],
  englishAuthorNames: [],
  photoStartDate: null,
  photoEndDate: null,
  voiceStartDate: null,
  voiceEndDate: null,
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
  photoStartDate: null,
  addPhotoStartDate: (date: Date) =>
    set(() => ({
      photoStartDate: date,
    })),
  photoEndDate: null,
  addPhotoEndDate: (date: Date) =>
    set(() => ({
      photoEndDate: date,
    })),
  voiceStartDate: null,
  addVoiceStartDate: (date: Date) =>
    set(() => ({
      voiceStartDate: date,
    })),
  voiceEndDate: null,
  addVoiceEndDate: (date: Date) =>
    set(() => ({
      voiceEndDate: date,
    })),
  reset: () => {
    set(initialState);
  },
}));
