export type PeriodType = "day" | "week" | "month" | "year";

export function useSalesDateRange() {
    const normalize = (value: string, type: PeriodType) => {
        if (!value) return value;

        switch (type) {
            case "day":
                return value;           // yyyy-MM-dd
            case "week":
                return value;           // yyyy-Www
            case "month":
                return value.slice(0, 7); // yyyy-MM
            case "year":
                return value.slice(0, 4); // yyyy
            default:
                return value;
        }
    };

    return { normalize };
}
