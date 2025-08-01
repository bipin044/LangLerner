import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("lingualink-theme") || "lingualink",
  setTheme: (theme) => {
    localStorage.setItem("lingualink-theme", theme);
    set({ theme });
  },
}));
