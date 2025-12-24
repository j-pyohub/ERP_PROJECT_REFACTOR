import apiClient from "../../../shared/apis/apiClient";
import type {
    SalesKpiParams,
    SalesChartParams,
    MenuRatioParams,
} from "../types/SalesApi";
import type {SalesListParams, SalesListResponse} from "../types/SalesList.tsx";

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