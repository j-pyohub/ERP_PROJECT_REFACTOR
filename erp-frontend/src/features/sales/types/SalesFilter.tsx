export type SalesPeriodType = "day" | "month" | "week" | "year";

export type SalesFilterState = {
    periodType: SalesPeriodType;
    from: string;
    to: string;
};