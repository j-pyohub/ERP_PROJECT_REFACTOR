import { create } from "zustand/react";
import type { Item } from "../../item/types/Item";

interface MenuIngredientState {
  selectedItems: Item[];

  checkItem: (item: Item) => void;
  removeItem: (itemNo: number) => void;
  clearItems: () => void;
}

export const useMenuIngredientStore = create<MenuIngredientState>((set, get) => ({
  selectedItems: [],

  checkItem: (item) => {
    const exists = get().selectedItems.some(
      (i) => i.itemNo === item.itemNo
    );

    set({
      selectedItems: exists
        ? get().selectedItems.filter(i => i.itemNo !== item.itemNo)
        : [...get().selectedItems, item],
    });
  },

  removeItem: (itemNo) =>
    set({
      selectedItems: get().selectedItems.filter(
        (i) => i.itemNo !== itemNo
      ),
    }),

  clearItems: () => set({ selectedItems: [] }),
}));
