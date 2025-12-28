import type { ReleaseStatus } from "./Menu";

export interface MenuAddRequest {
    menuName: string;
    menuCode: string;
    menuCategory: number;
    menuExplain: string;
    size: string;
    hasSize: boolean;
    menuPrice: number;
    menuPriceLarge: number;
    menuPriceMedium: number;
    releaseStatus: ReleaseStatus;

    ingredients: {
        itemNo: number;
        quantity: number;
        quantityLarge: number;
        quantityMedium: number;
    }[];

    removeImage?: boolean;

}