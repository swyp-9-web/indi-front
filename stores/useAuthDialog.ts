import { create } from 'zustand';

interface AuthDialogState {
  isOpen: boolean;
}

interface AuthDialogActions {
  toggleIsOpen: () => void;
}

type AuthDialogStore = AuthDialogState & AuthDialogActions;

export const useAuthDialog = create<AuthDialogStore>((set, get) => ({
  isOpen: false,
  toggleIsOpen: () => set({ isOpen: !get().isOpen }),
}));
