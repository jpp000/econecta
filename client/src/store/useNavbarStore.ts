import { create } from "zustand";

export type NavbarVariant = "transparent" | "light" | "dark";

interface NavbarState {
  variant: NavbarVariant;
  setVariant: (variant: NavbarVariant) => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
  variant: "transparent",
  setVariant: (variant) => set({ variant }),
}));
