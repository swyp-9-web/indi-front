import { create } from 'zustand';

interface ArtistWelcomeDialogState {
  isOpen: boolean;
  onClickGoBackButton: () => void;
}

interface ArtistWelcomeDialogActions {
  toggleIsOpen: () => void;
  setOnClickGoBackButton: (callback: () => void) => void;
}

type ArtistWelcomeDialogStore = ArtistWelcomeDialogState & ArtistWelcomeDialogActions;

export const useArtistWelcomeDialog = create<ArtistWelcomeDialogStore>((set, get) => ({
  isOpen: false,
  onClickGoBackButton: () => {},

  toggleIsOpen: () => set({ isOpen: !get().isOpen }),
  setOnClickGoBackButton: (callback) => set({ onClickGoBackButton: callback }),
}));
