import { useState } from "react";
import SalesViewToggle from "../components/SalesViewToggle";
import SalesChartSection from "../components/SalesChartSection";
import SalesListSection from "../components/SalesListSection";

function SalesPage() {
    const [viewMode, setViewMode] = useState<"chart" | "list">("chart");

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold">매출 관리</h2>
            </div>

            <SalesViewToggle viewMode={viewMode} onChange={setViewMode} />

            {viewMode === "chart" && <SalesChartSection />}
            {viewMode === "list" && <SalesListSection />}
        </>
    );
}

export default SalesPage;

