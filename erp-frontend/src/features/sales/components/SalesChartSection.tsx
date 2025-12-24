import { useEffect, useState } from "react";
import SalesFilterBar from "./SalesFilterBar";
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

type StoreTop5 = {
    storeName: string;
    totalSales: number;
};

type MenuRatio = {
    menuName: string;
    salesAmount: number;
};

export default function SalesChartSection({ filter, setFilter }: Props) {
    const [kpi, setKpi] = useState<KpiState | null>(null);
    const [trend, setTrend] = useState<{ labels: string[]; values: number[] }>({
        labels: [],
        values: [],
    });
    const [top5, setTop5] = useState<StoreTop5[]>([]);
    const [menuRatio, setMenuRatio] = useState<MenuRatio[]>([]);

    // 초기 진입 시 → 이번 달 자동 세팅
    useEffect(() => {
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
        }));
    }, [setFilter]);

    const handleChartSearch = async () => {
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

    // 기간 or 단위 변경 시 자동 재조회
    useEffect(() => {
        handleChartSearch();
    }, [filter.from, filter.to, filter.periodType]);

    return (
        <>
            <div className="mb-4">
                <SalesFilterBar
                    showPeriodType
                    periodType={filter.periodType}
                    from={filter.from}
                    to={filter.to}
                    onChangePeriodType={(v) =>
                        setFilter((prev) => ({ ...prev, periodType: v }))
                    }
                    onChangeFrom={(v) =>
                        setFilter((prev) => ({ ...prev, from: v }))
                    }
                    onChangeTo={(v) =>
                        setFilter((prev) => ({ ...prev, to: v }))
                    }
                    onSearch={handleChartSearch}
                />
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <KpiCard
                        title="전체 매출"
                        value={kpi?.totalSales?.toLocaleString() ?? "-"}
                    />
                </div>
                <div className="col-md-3">
                    <KpiCard
                        title="총 판매 수량"
                        value={kpi?.totalMenuCount?.toLocaleString() ?? "-"}
                    />
                </div>
                <div className="col-md-3">
                    <KpiCard
                        title="평균 직영점 매출"
                        value={
                            kpi?.avgStoreSales?.toLocaleString() ??
                            kpi?.avgOrderAmount?.toLocaleString() ??
                            "-"
                        }
                    />
                </div>
                <div className="col-md-3">
                    <KpiCard
                        title="전주 대비 매출 증가"
                        value={kpi ? `${kpi.growthRate.toFixed(1)}%` : "-"}
                    />
                </div>
            </div>

            <SalesTrendSection labels={trend.labels} values={trend.values} />

            <div className="row g-3 mt-3">
                <div className="col-md-6">
                    <StoreTop5Chart
                        labels={top5.map((x) => x.storeName)}
                        values={top5.map((x) => x.totalSales)}
                    />
                </div>
                <div className="col-md-6">
                    <MenuRatioChart
                        labels={menuRatio.map((x) => x.menuName)}
                        values={menuRatio.map((x) => x.salesAmount)}
                    />
                </div>
            </div>
        </>
    );
}
