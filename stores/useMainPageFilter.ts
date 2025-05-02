import { create } from 'zustand';

interface MainPageFilterState {
  categories: string[];
  sizes: string[];
  setCategories: (categories: string[]) => void;
  setSizes: (sizes: string[]) => void;
  resetFilters: () => void;
}

export const useMainPageFilter = create<MainPageFilterState>((set) => ({
  categories: [],
  sizes: [],
  setCategories: (categories) => set({ categories }),
  setSizes: (sizes) => set({ sizes }),
  resetFilters: () => set({ categories: [], sizes: [] }),
}));
