import { useEffect, useState } from "react";
import KpiCard from "./KpiCard";
import SalesTrendSection from "./SalesTrendSection";
import StoreTop5Chart from "./StoreTop5Section";
import MenuRatioChart from "./MenuRatioSection";

import type { SalesFilterState } from "../../types/SalesFilter";
import {
    fetchSalesKpi,
    fetchSalesTrend,
    fetchStoreTop5,
    fetchMenuRatio,
} from "../../apis/salesApi";

import StoreSearchModal from "../common/StoreSearchModal";
import SalesChartBar from "./SalesChartBar";

type Props = {
    filter: SalesFilterState;
    setFilter: React.Dispatch<React.SetStateAction<SalesFilterState>>;
};

type KpiState = {
    totalSales: number;
    totalMenuCount: number;
    avgStoreSales?: number;
    avgOrderAmount?: number;
    growthRate: number;
};

export default function SalesChartSection({ filter, setFilter }: Props) {
    const [storeNo, setStoreNo] = useState<number | null>(null);
    const [storeName, setStoreName] = useState("");
    const [openStoreModal, setOpenStoreModal] = useState(false);

    const [kpi, setKpi] = useState<KpiState | null>(null);
    const [trend, setTrend] = useState<{ labels: string[]; values: number[] }>({
        labels: [],
        values: [],
    });
    const [top5, setTop5] = useState<{ storeName: string; totalSales: number }[]>([]);
    const [menuRatio, setMenuRatio] = useState<
        { menuName: string; salesAmount: number }[]
    >([]);

    const getDefaultDateRange = () => {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today);
        end.setDate(end.getDate() - 1);

        const toDate = (d: Date) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                d.getDate()
            ).padStart(2, "0")}`;

        return {
            periodType: "day" as const,
            from: toDate(start),
            to: toDate(end),
        };
    };

    useEffect(() => {
        if (filter.from || filter.to) return;

        const { periodType, from, to } = getDefaultDateRange();

        setFilter({
            periodType,
            from,
            to,
        });

        handleSearch(periodType, from, to, null);
    }, []);

    const handleSearch = async (
        type = filter.periodType,
        from = filter.from,
        to = filter.to,
        store = storeNo
    ) => {
        if (!from || !to) return;

        const params: any = {
            type,
            startDate: from,
            endDate: to,
        };

        if (store) {
            params.storeNo = store;
        }

        const [kpiRes, trendRes, top5Res, menuRes] = await Promise.all([
            fetchSalesKpi(params),
            fetchSalesTrend(params),
            fetchStoreTop5(),
            fetchMenuRatio(params),
        ]);

        setKpi(kpiRes.data);
        setTrend(trendRes.data);
        setTop5(top5Res.data);
        setMenuRatio(menuRes.data);
    };

    return (
        <section className="w-full max-w-[1500px] mx-auto px-4 space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-4">
                <SalesChartBar
                    filter={filter}
                    onChange={setFilter}
                    storeName={storeName}
                    onOpenStoreModal={() => setOpenStoreModal(true)}
                    onSearch={() => handleSearch()}

                    onReset={() => {
                        const { periodType, from, to } = getDefaultDateRange();

                        setStoreNo(null);
                        setStoreName("");

                        setFilter({
                            periodType,
                            from,
                            to,
                        });
                        handleSearch(periodType, from, to, null);
                    }}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="전체 매출" value={kpi?.totalSales?.toLocaleString() ?? "-"} />
                <KpiCard
                    title="총 판매 수량"
                    value={kpi?.totalMenuCount?.toLocaleString() ?? "-"}
                />
                <KpiCard
                    title="평균 직영점 매출"
                    value={kpi?.avgStoreSales?.toLocaleString() ?? "-"}
                />
                <KpiCard
                    title="전주 대비 매출 증가"
                    value={kpi ? `${kpi.growthRate.toFixed(1)}%` : "-"}
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
                <SalesTrendSection labels={trend.labels} values={trend.values} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <StoreTop5Chart
                        labels={top5.map((x) => x.storeName)}
                        values={top5.map((x) => x.totalSales)}
                    />
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5">
                    <MenuRatioChart
                        labels={menuRatio.map((x) => x.menuName)}
                        values={menuRatio.map((x) => x.salesAmount)}
                    />
                </div>
            </div>

            <StoreSearchModal
                open={openStoreModal}
                onClose={() => setOpenStoreModal(false)}
                onSelect={(no, name) => {
                    setStoreNo(no);
                    setStoreName(name);
                }}
            />
        </section>
    );
}
