import { create } from 'zustand';

interface MainPageFilterState {
  categories: string[];
  sizes: string[];
}

interface MainPageFilterActions {
  setCategories: (categories: string[]) => void;
  setSizes: (sizes: string[]) => void;
  resetFilters: () => void;
}

type MainPageFilterStore = MainPageFilterState & MainPageFilterActions;

export const useMainPageFilter = create<MainPageFilterStore>((set) => ({
  categories: [],
  sizes: [],
  setCategories: (categories) => set({ categories }),
  setSizes: (sizes) => set({ sizes }),
  resetFilters: () => set({ categories: [], sizes: [] }),
}));
