import { useEffect } from "react";
import type { SalesFilterState } from "../types/SalesFilter";

type Params = {
    filter: SalesFilterState;
    setFilter: React.Dispatch<React.SetStateAction<SalesFilterState>>;
    onReady: () => void; // 날짜 준비되면 실행할 콜백
};

const getDefaultDateRange = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);

    const end = new Date(today);
    end.setDate(end.getDate() - 1); // 어제까지

    const toDate = (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
        ).padStart(2, "0")}`;

    return {
        from: toDate(start),
        to: toDate(end),
    };
};

export default function useDefaultDateFilter({
                                                 filter,
                                                 setFilter,
                                                 onReady,
                                             }: Params) {
    useEffect(() => {
        if (!filter.from || !filter.to) {
            setFilter((prev) => ({
                ...prev,
                ...getDefaultDateRange(),
            }));
        }
    }, []);

    useEffect(() => {
        if (!filter.from || !filter.to) return;
        onReady();
    }, [filter.from, filter.to]);
}
