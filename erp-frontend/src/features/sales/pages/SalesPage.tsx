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

            {/* 리스트 */}
            {viewMode === "list" && (
                <SalesListSection
                    filter={listFilter}
                    setFilter={setListFilter}
                />
            )}
        </section>
    );
}
