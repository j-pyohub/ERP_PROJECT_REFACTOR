export type SalesListItem = {
    storeNo: number;
    storeName: string;
    address: string;
    growthRate?: string;
    orderCount: number;
    salesAmount: number;
    salesDate: string;
};

export type SalesListResponse = {
    list: SalesListItem[];
    totalPages: number;
    currentPage: number;
};

export type SalesListParams = {
    startDate: string;
    endDate: string;
    storeName?: string;
    page: number;
};
