import { create } from 'zustand';

interface ArtistWelcomeDialogState {
  isOpen: boolean;
  onCloseCallback: () => void;
}

interface ArtistWelcomeDialogActions {
  toggleIsOpen: () => void;
  setOnCloseCallback: (callback: () => void) => void;
}

type ArtistWelcomeDialogStore = ArtistWelcomeDialogState & ArtistWelcomeDialogActions;

export const useArtistWelcomeDialog = create<ArtistWelcomeDialogStore>((set, get) => ({
  isOpen: false,
  onCloseCallback: () => {},

  toggleIsOpen: () => set({ isOpen: !get().isOpen }),
  setOnCloseCallback: (callback) => set({ onCloseCallback: callback }),
}));
