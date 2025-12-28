export type SalesOrderListParams = {
    orderDate?: string;
    storeName?: string;
    page: number;
};

export type SalesOrderItem = {
    salesOrderNo: number;
    salesOrderDatetime: string;
    storeName: string;
    salesOrderCount: number;
    salesOrderAmount: number;
};

export type SalesOrderListResponse = {
    list: SalesOrderItem[];
    page: number;
    totalPages: number;
};
