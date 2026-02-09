import { create } from "zustand";

type ViewMode = 'list' | 'image';

interface MenuViewState {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
}

export const useMenuViewStore = create<MenuViewState>((set) => ({
    viewMode: 'list',
    setViewMode: (mode: ViewMode) => set({ viewMode: mode })
}));