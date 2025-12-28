// features/menu/stores/menuIngredientStore.ts
import { create } from "zustand";
import type { MenuIngredient } from "../../../shared/types/MenuIngredient";
import type { Item } from "../../../shared/types/Item";
``
interface MenuIngredientState {
  tempItems: Item[];
  checkedItems: MenuIngredient[];

  checkTempItem: (item: Item) => void;
  checkTempAll: (items: Item[]) => void;
  checkTempToRecipe: () => void;
  resetTemp: () => void;
  removeRecipeItem: (itemNo: number) => void;
  updateRecipeQuantity: (
  itemNo: number,
  field: "quantity" | "quantityLarge" | "quantityMedium",
  value: number
) => void;

}

export const useMenuIngredientStore = create<MenuIngredientState>((set, get) => ({
  tempItems: [],
  checkedItems: [],

  checkTempItem: (item) => {
    const exists = get().tempItems.some(i => i.itemNo === item.itemNo);
    set({
      tempItems: exists
        ? get().tempItems.filter(i => i.itemNo !== item.itemNo)
        : [...get().tempItems, item],
    });
  },

  checkTempAll: (items) => {
    const allChecked =
      items.length > 0 &&
      items.every(item =>
        get().tempItems.some(i => i.itemNo === item.itemNo)
      );

    set({
      tempItems: allChecked ? [] : items,
    });
  },

  checkTempToRecipe: () => {
    const recipeItems: MenuIngredient[] = get().tempItems.map(item => ({
      itemNo: item.itemNo,
      itemCode: item.itemCode,
      ingredientName: item.ingredientName,
      stockUnit: item.stockUnit,
      quantity: undefined,
      quantityLarge: undefined,
      quantityMedium: undefined,
    }));

    set({ checkedItems: recipeItems });
  },

  resetTemp: () => {
    set({ tempItems: [] });
  },

  removeRecipeItem: (itemNo: number) => {
    set({
      checkedItems: get().checkedItems.filter(
        i => i.itemNo !== itemNo
      ),
      tempItems: get().tempItems.filter(
        i => i.itemNo !== itemNo
      ),
    });
  },

  updateRecipeQuantity: (itemNo, field, value) => {
  set({
    checkedItems: get().checkedItems.map(item =>
      item.itemNo === itemNo
        ? { ...item, [field]: value }
        : item
    ),
  });
},
}));