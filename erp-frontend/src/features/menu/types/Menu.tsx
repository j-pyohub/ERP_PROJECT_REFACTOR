export type ReleaseStatus = '출시 예정' | '출시 중' | '출시 중단';
import type { MenuCategory } from "../../../shared/types/MenuCategory"; 

export interface Menu {
    menuNo: number;
    menuName: string;
    menuCode: string;
    menuCategory: MenuCategory;
    menuExplain: string;
    size: string;
    menuImage: string;
    menuPrice: number;
    releaseStatus: ReleaseStatus;
    inDate: Date;
    editDate: Date;
    delDate: Date;
}