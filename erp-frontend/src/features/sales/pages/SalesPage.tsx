import { useState } from "react";
import SalesViewToggle from "../components/common/SalesViewToggle";
import SalesChartSection from "../components/chart/SalesChartSection";
import SalesListSection from "../components/list/SalesListSection";
import type { SalesFilterState } from "../types/SalesFilter.ts";

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
        <section className="w-full max-w-[1500px] mx-auto px-4 py-3 space-y-4">
            <h4 className="text-lg font-semibold">매출 관리</h4>

            <SalesViewToggle
                viewMode={viewMode}
                onChange={setViewMode}
            />

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
        </section>
    );
}
