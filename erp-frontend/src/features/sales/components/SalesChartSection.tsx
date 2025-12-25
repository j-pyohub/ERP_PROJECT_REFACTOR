import { useEffect, useState } from "react";
import KpiCard from "./KpiCard";
import SalesTrendSection from "./SalesTrendSection";
import StoreTop5Chart from "./StoreTop5Section";
import MenuRatioChart from "./MenuRatioSection";

import type { SalesFilterState } from "../types/SalesFilter";
import {
    fetchSalesKpi,
    fetchSalesTrend,
    fetchStoreTop5,
    fetchMenuRatio,
} from "../apis/salesApi";

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

export default function SalesChartSection({
                                              filter,
                                              setFilter,

                                          }: Props) {
    const [kpi, setKpi] = useState<KpiState | null>(null);

    const [trend, setTrend] = useState({
        labels: [] as string[],
        values: [] as number[],
    });

    const [top5, setTop5] = useState<
        { storeName: string; totalSales: number }[]
    >([]);

    const [menuRatio, setMenuRatio] = useState<
        { menuName: string; salesAmount: number }[]
    >([]);

    /* ================= 초기 날짜 세팅 (Spring UI 동일) ================= */
    useEffect(() => {
        if (filter.from && filter.to) return;

        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today);
        end.setDate(end.getDate() - 1);

        const toDate = (d: Date) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                d.getDate()
            ).padStart(2, "0")}`;

        setFilter((prev) => ({
            ...prev,
            from: toDate(start),
            to: toDate(end),
            periodType: "day",
        }));
    }, []);

    /* ================= 조회 ================= */
    const handleSearch = async () => {
        if (!filter.from || !filter.to) return;

        const params = {
            type: filter.periodType,
            startDate: filter.from,
            endDate: filter.to,
        };

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

    useEffect(() => {
        handleSearch();
    }, [filter.from, filter.to, filter.periodType]);

    return (
        <section className="w-full max-w-[1500px] mx-auto px-4 space-y-6">
            {/* ================= 조회 / 토글 ================= */}
            <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    {/* 좌측 */}
                    <div className="flex flex-wrap items-center gap-6">



                        {/* 기간 타입 */}
                        <div className="flex items-center gap-3 text-sm">
                            {[
                                ["day", "일별"],
                                ["week", "주별"],
                                ["month", "월별"],
                                ["year", "연별"],
                            ].map(([value, label]) => (
                                <label key={value} className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        checked={filter.periodType === value}
                                        onChange={() =>
                                            setFilter((prev) => ({
                                                ...prev,
                                                periodType: value as any,
                                            }))
                                        }
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 날짜 */}
                    <div className="flex items-center gap-2 text-sm">
                        <span>조회기간</span>
                        <input
                            type="date"
                            value={filter.from}
                            onChange={(e) =>
                                setFilter((prev) => ({ ...prev, from: e.target.value }))
                            }
                            className="border rounded px-2 py-1"
                        />
                        <span>~</span>
                        <input
                            type="date"
                            value={filter.to}
                            onChange={(e) =>
                                setFilter((prev) => ({ ...prev, to: e.target.value }))
                            }
                            className="border rounded px-2 py-1"
                        />
                    </div>

                    {/* 버튼 */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleSearch}
                            className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm"
                        >
                            조회
                        </button>
                        <button
                            onClick={() =>
                                setFilter((prev) => ({ ...prev, from: "", to: "" }))
                            }
                            className="px-4 py-1.5 bg-blue-500 text-white rounded text-sm"
                        >
                            초기화
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= KPI ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard title="전체 매출" value={kpi?.totalSales?.toLocaleString() ?? "-"} />
                <KpiCard title="총 판매 수량" value={kpi?.totalMenuCount?.toLocaleString() ?? "-"} />
                <KpiCard
                    title="평균 직영점 매출"
                    value={
                        kpi?.avgStoreSales?.toLocaleString() ??
                        kpi?.avgOrderAmount?.toLocaleString() ??
                        "-"
                    }
                />
                <KpiCard
                    title="전주 대비 매출 증가"
                    value={kpi ? `${kpi.growthRate.toFixed(1)}%` : "-"}
                />
            </div>

            {/* ================= 차트 ================= */}
            <div className="bg-white rounded-xl shadow-sm p-4">
                <SalesTrendSection labels={trend.labels} values={trend.values} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <h6 className="text-sm font-semibold mb-3">
                        최근 30일 지점별 매출 TOP 5
                    </h6>
                    <StoreTop5Chart
                        labels={top5.map((x) => x.storeName)}
                        values={top5.map((x) => x.totalSales)}
                    />
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                    <h6 className="text-sm font-semibold mb-3">
                        최근 30일 메뉴별 매출 비중
                    </h6>
                    <MenuRatioChart
                        labels={menuRatio.map((x) => x.menuName)}
                        values={menuRatio.map((x) => x.salesAmount)}
                    />
                </div>
            </div>
        </section>
    );
}
