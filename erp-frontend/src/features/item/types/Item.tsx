export type ReleaseStatus = '출시 예정' | '출시 중' | '출시 중단';
export interface Item {
    itemCode: string;
    itemCategory: string;
    itemName: string;
    ingredientName: string;
    stockUnit: string;
    supplyUnit: string;
    supplier: string;
    itemPrice: string;
    convertStock: string;
    storageType: string;
    expiratikonType: string;
    expiration: string;
    note: string;
}