import { useEffect, useState } from "react";
import KpiCard from "./KpiCard";
import SalesTrendSection from "./SalesTrendSection";
import StoreTop5Chart from "./StoreTop5Section";
import MenuRatioChart from "./MenuRatioSection";
import Button from "../../../shared/components/Button";

import type { SalesFilterState } from "../types/SalesFilter";
import {
    fetchSalesKpi,
    fetchSalesTrend,
    fetchStoreTop5,
    fetchMenuRatio,
} from "../apis/salesApi";

import StoreSearchModal from "./StoreSearchModal";

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

const INPUT_TYPE_MAP = {
    day: "date",
    week: "week",
    month: "month",
    year: "number",
} as const;

export default function SalesChartSection({ filter, setFilter }: Props) {
    /* ===============================
       직영점 선택 (모달)
    =============================== */
    const [storeNo, setStoreNo] = useState<number | null>(null);
    const [storeName, setStoreName] = useState("");
    const [openStoreModal, setOpenStoreModal] = useState(false);

    /* ===============================
       데이터 상태
    =============================== */
    const [kpi, setKpi] = useState<KpiState | null>(null);
    const [trend, setTrend] = useState<{ labels: string[]; values: number[] }>({
        labels: [],
        values: [],
    });
    const [top5, setTop5] = useState<{ storeName: string; totalSales: number }[]>([]);
    const [menuRatio, setMenuRatio] = useState<
        { menuName: string; salesAmount: number }[]
    >([]);

    /* ===============================
       최초 진입 → 전체 직영점 자동 조회
    =============================== */
    useEffect(() => {
        if (filter.from || filter.to) return;

        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today);
        end.setDate(end.getDate() - 1);

        const toDate = (d: Date) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                d.getDate()
            ).padStart(2, "0")}`;

        const from = toDate(start);
        const to = toDate(end);

        setFilter({
            periodType: "day",
            from,
            to,
        });

        // ✅ storeNo 없이 = 전체 조회
        handleSearch("day", from, to, null);
    }, []);

    /* ===============================
       조회 로직 (핵심)
    =============================== */
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

        // ✅ 직영점 선택된 경우만 파라미터 추가
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
            {/* ===============================
               검색 영역
            =============================== */}
            <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex flex-wrap items-center gap-6">

                    {/* 기간 타입 */}
                    <div className="flex items-center gap-4 text-sm">
                        {[
                            ["day", "일별"],
                            ["week", "주별"],
                            ["month", "월별"],
                            ["year", "연별"],
                        ].map(([value, label]) => (
                            <label key={value} className="flex items-center gap-1 h-9">
                                <input
                                    type="radio"
                                    checked={filter.periodType === value}
                                    onChange={() =>
                                        setFilter((prev) => ({
                                            ...prev,
                                            periodType: value as any,
                                            from: "",
                                            to: "",
                                        }))
                                    }
                                />
                                {label}
                            </label>
                        ))}
                    </div>

                    {/* 조회기간 */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">조회기간</span>

                        <input
                            type={INPUT_TYPE_MAP[filter.periodType]}
                            value={filter.from}
                            onChange={(e) =>
                                setFilter((prev) => ({
                                    ...prev,
                                    from: e.target.value,
                                }))
                            }
                            className="border rounded px-2 py-1 h-9 w-36"
                        />

                        <span>~</span>

                        <input
                            type={INPUT_TYPE_MAP[filter.periodType]}
                            value={filter.to}
                            onChange={(e) =>
                                setFilter((prev) => ({
                                    ...prev,
                                    to: e.target.value,
                                }))
                            }
                            className="border rounded px-2 py-1 h-9 w-36"
                        />
                    </div>

                    {/* 직영점 (모달 전용) */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">직영점</span>
                        <input
                            readOnly
                            value={storeName || "전체 직영점"}
                            onClick={() => setOpenStoreModal(true)}
                            className="border rounded px-2 py-1 h-9 w-44 bg-gray-50 cursor-pointer"
                        />
                    </div>

                    {/* 버튼 */}
                    <div className="flex items-center gap-2">
                        <Button
                            className="yellow-btn h-9 px-4 text-sm"
                            onClick={() => handleSearch()}
                        >
                            조회
                        </Button>

                        <Button
                            className="white-btn h-9 px-4 text-sm"
                            onClick={() => {
                                setStoreNo(null);
                                setStoreName("");
                                setFilter({
                                    periodType: filter.periodType,
                                    from: "",
                                    to: "",
                                });
                            }}
                        >
                            초기화
                        </Button>
                    </div>
                </div>
            </div>

            {/* ===============================
               KPI
            =============================== */}
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

            {/* ===============================
               차트
            =============================== */}
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
