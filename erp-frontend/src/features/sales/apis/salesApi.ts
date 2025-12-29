import apiClient from "../../../shared/apis/apiClient";
import type { SalesDetailItem } from "../types/SalesDetail.ts";
import type {
    SalesKpiParams,
    SalesChartParams,
    MenuRatioParams,
} from "../types/SalesApi.ts";
import type {SalesListParams, SalesListResponse} from "../types/SalesList.ts";
import type {Store} from "../../../shared/types/Store.tsx";
import type { StoreMenuItem } from "../types/StoreMenuItem";
import type { OrderRow } from "../types/OrderRow";


export function fetchSalesKpi(params: SalesKpiParams) {
    return apiClient.get("/sales/KPI", { params });
}

export function fetchSalesTrend(params: SalesChartParams) {
    return apiClient.get("/sales/salesChart", { params });
}

export function fetchStoreTop5() {
    return apiClient.get("/sales/totalStoreSales");
}

export function fetchMenuRatio(params: MenuRatioParams) {
    return apiClient.get("/sales/menuRatio", { params });
}

export function fetchSalesList(params: SalesListParams) {
    return apiClient.get<SalesListResponse>("/sales/salesList", { params });
}

export function fetchSalesDetail(
    storeNo: number,
    salesDate: string
) {
    return apiClient.get<SalesDetailItem[]>(
        "/sales/salesDetail",
        {
            params: { storeNo, salesDate },
        }
    );
}

export function fetchStoreList() {
    return apiClient.get<Store[]>("/storeSearch/modal");
}

export function fetchStoreMenu(storeNo: number) {
    return apiClient.get<StoreMenuItem[]>(
        `/storeMenu/getStoreMenu/${storeNo}`
    );
}


export function createSalesOrder(
    storeNo: number,
    orderRows: OrderRow[]
) {
    return apiClient.post("/sales/getSalesOrder/addSalesOrder", {
        storeNo,
        menuList: orderRows.map((r) => ({
            storeMenuNo: r.storeMenuNo,
        })),
        detailList: orderRows.map((r) => ({
            count: r.quantity,
            price: r.unitPrice,
        })),
    });
}
