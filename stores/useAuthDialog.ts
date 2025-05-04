import { create } from 'zustand';

interface AuthDialogStore {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

export const useAuthDialog = create<AuthDialogStore>((set, get) => ({
  isOpen: false,
  toggleIsOpen: () => set({ isOpen: !get().isOpen }),
}));
