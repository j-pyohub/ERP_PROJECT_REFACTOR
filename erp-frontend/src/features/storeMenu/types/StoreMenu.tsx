export type SalesStatus = '판매중' | '판매중단' | '품절';
import type { MenuCategory } from "../../../shared/types/MenuCategory"; 

export interface StoreMenu {
    storeMenuNo : number;
    storeName : string;
    menuCode : string;
    menuName : string;
    size : string;
    menuPrice : number;
    salesStatus : SalesStatus;
    menuCategory : MenuCategory;
}