export type SalesKpiParams = {
    type: "day" | "week" | "month" | "year";
    startDate: string;
    endDate: string;
    storeNo?: number;
};

export type SalesChartParams = {
    type: "day" | "week" | "month" | "year";
    startDate: string;
    endDate: string;
    storeNo?: number;
};

export type MenuRatioParams = {
    startDate: string;
    endDate: string;
    storeNo?: number;
};
