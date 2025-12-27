export interface MenuIngredient {
    itemNo: number;
    menuNo: number;
    itemCode: string;
    ingredientName: string;
    stockUnit: string;
    quantity: number;
    quantityLarge?: number;
    quantityMedium?: number;
}