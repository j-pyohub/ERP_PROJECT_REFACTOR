import { useState } from "react";
import SalesViewToggle from "../components/SalesViewToggle";
import SalesChartSection from "../components/SalesChartSection";
import SalesListSection from "../components/SalesListSection";
import type { SalesFilterState } from "../types/SalesFilter";

const getDefaultFilter = (): SalesFilterState => ({
    periodType: "day",
    from: "",
    to: "",
});

export default function SalesPage() {
    const [viewMode, setViewMode] = useState<"chart" | "list">("chart");

    const [chartFilter, setChartFilter] =
        useState<SalesFilterState>(getDefaultFilter());

    const [listFilter, setListFilter] =
        useState<SalesFilterState>(getDefaultFilter());

    return (
        <>
            <h2 className="fw-bold mb-4">매출 관리</h2>

            <SalesViewToggle viewMode={viewMode} onChange={setViewMode} />

            {viewMode === "chart" && (
                <SalesChartSection
                    filter={chartFilter}
                    setFilter={setChartFilter}
                />
            )}

            {viewMode === "list" && (
                <SalesListSection
                    filter={listFilter}
                    setFilter={setListFilter}
                />
            )}
        </>
    );
}
