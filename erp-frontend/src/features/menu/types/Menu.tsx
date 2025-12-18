export type ReleaseStatus = '출시 예정' | '출시 중' | '출시 중단';
export type MenuCategory = '피자' | '사이드디시' | '음료' | '기타';

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