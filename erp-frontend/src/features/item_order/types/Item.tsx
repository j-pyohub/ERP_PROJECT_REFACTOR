export type ReleaseStatus = '출시 예정' | '출시 중' | '출시 중단';
export interface Item {
    itemNo: number;
    itemCode: string;
    itemCategory: string;
    itemName: string;
    stockUnit: string;
    supplyUnit: string;
    convertStock: number;
    supplier: string;
    itemPrice: number;
    itemQuantity: number;
    storeLimit: number;
    managerLimit: number;

    itemOrderCnt: number;
}