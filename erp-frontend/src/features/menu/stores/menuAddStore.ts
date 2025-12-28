import { create } from "zustand";
import type { MenuIngredient } from "../../../shared/types/MenuIngredient";

interface MenuAddState {
    menuName: string;
    menuCode: string;
    menuCategory: string;
    menuExplain: string;
    size: "Y" | "N";
    hasSize: boolean;
    menuPrice?: number;
    menuPriceLarge?: number;
    menuPriceMedium?: number;
    releaseStatus: string;

    menuImageFile?: File | null;

    ingredients: MenuIngredient[];

    setField: <K extends keyof MenuAddState>(
        key: K,
        value: MenuAddState[K]
    ) => void;

    addIngredients: (items: MenuIngredient[]) => void;
    updateIngredientQuantity: (
        itemNo: number,
        field: "quantity" | "quantityLarge" | "quantityMedium",
        value: number | undefined
    ) => void;
    removeIngredient: (itemNo: number) => void;

    reset: () => void;
}

export const useMenuAddStore = create<MenuAddState>((set) => ({
    
    menuName: "",
    menuCode: "",
    menuCategory: "피자",
    menuExplain: "",
    size: "Y",
    hasSize: true,
    releaseStatus: "출시 예정",

    menuPrice: undefined,
    menuPriceLarge: undefined,
    menuPriceMedium: undefined,

    menuImageFile: null,
    ingredients: [],
  
    setField: (key, value) =>
        set((state) => ({
        ...state,
        [key]: value,
    })),

    addIngredients: (items) =>
    set((state) => ({
        ingredients: [...state.ingredients, ...items],
    })),

    updateIngredientQuantity: (itemNo, field, value) =>
        set((state) => ({
        ingredients: state.ingredients.map((i) =>
            i.itemNo === itemNo ? { ...i, [field]: value } : i
        ),
        })),

    removeIngredient: (itemNo) =>
        set((state) => ({
        ingredients: state.ingredients.filter(
            (i) => i.itemNo !== itemNo
        ),
        })),

  reset: () =>
    set(() => ({
      menuName: "",
      menuCode: "",
      menuCategory: "피자",
      menuExplain: "",
      size: "Y",
      releaseStatus: "출시 예정",
      menuPrice: 0,
      menuPriceLarge: 0,
      menuPriceMedium: 0,
      menuImageFile: null,
      ingredients: [],
    })),


}));