export type SalesPeriodType = "day" | "month";

export type SalesFilterState = {
    periodType: SalesPeriodType;
    from: string;
    to: string;
};