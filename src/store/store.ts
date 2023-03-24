import { create } from "zustand";

interface State {
  photoLocations: string[];
}

interface Action {
  addPhotoLocations: (locations: string[]) => void;
}

export const useStore = create<State & Action>((set) => ({
  photoLocations: [],
  addPhotoLocations: (locations) =>
    set(() => ({
      photoLocations: locations,
    })),
}));
