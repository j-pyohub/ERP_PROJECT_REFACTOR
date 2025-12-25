import { useEffect, useState } from "react";
import Button from "../../../shared/components/Button";
import type { SalesFilterState } from "../types/SalesFilter";
import { fetchSalesList } from "../apis/salesApi";
import type { SalesListItem } from "../types/SalesList";

type Props = {
    filter: SalesFilterState;
    setFilter: React.Dispatch<React.SetStateAction<SalesFilterState>>;
};

const getDefaultDateRange = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today);
    end.setDate(end.getDate() - 1);

    const toDate = (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
        ).padStart(2, "0")}`;

    return { from: toDate(start), to: toDate(end) };
};

export default function SalesListSection({ filter, setFilter }: Props) {
    const [storeName, setStoreName] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState<SalesListItem[]>([]);

    const loadList = async (targetPage = 1) => {
        if (!filter.from || !filter.to) return;

        const res = await fetchSalesList({
            startDate: filter.from,
            endDate: filter.to,
            storeName: storeName || undefined,
            page: targetPage,
        });

        setList(res.data.list);
        setTotalPages(res.data.totalPages);
        setPage(res.data.currentPage);
    };

    // ✅ 최초 진입 시 날짜만 세팅
    useEffect(() => {
        if (!filter.from || !filter.to) {
            setFilter((prev) => ({ ...prev, ...getDefaultDateRange() }));
        }
    }, []);

    return (
        <div className="section-box mt-3">
            <h6 className="fw-bold mb-3">직영점별 매출 리스트</h6>

            <div className="d-flex gap-2 mb-3 align-items-end flex-wrap">
                <div>
                    <label className="form-label fw-semibold">기간 From</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        value={filter.from}
                        onChange={(e) =>
                            setFilter((prev) => ({ ...prev, from: e.target.value }))
                        }
                    />
                </div>

                <div>
                    <label className="form-label fw-semibold">기간 To</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        value={filter.to}
                        onChange={(e) =>
                            setFilter((prev) => ({ ...prev, to: e.target.value }))
                        }
                    />
                </div>

                <div>
                    <label className="form-label fw-semibold">지점명</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && loadList(1)}
                    />
                </div>

                <Button onClick={() => loadList(1)}>조회</Button>
            </div>

            <table className="table table-hover align-middle">
                <thead>
                <tr className="text-center">
                    <th>번호</th>
                    <th>직영점명</th>
                    <th>지역</th>
                    <th>전일대비</th>
                    <th>주문수</th>
                    <th>매출액</th>
                    <th>판매날짜</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {list.length === 0 && (
                    <tr>
                        <td colSpan={8} className="text-center">
                            데이터가 없습니다.
                        </td>
                    </tr>
                )}

                {list.map((item, idx) => (
                    <tr key={`${item.storeNo}-${item.salesDate}`} className="text-center">
                        <td>{(page - 1) * 10 + idx + 1}</td>
                        <td>{item.storeName}</td>
                        <td className="text-start">{item.address}</td>
                        <td>{item.growthRate ?? "-"}</td>
                        <td>{item.orderCount.toLocaleString()}</td>
                        <td>{item.salesAmount.toLocaleString()}</td>
                        <td>{item.salesDate}</td>
                        <td>상세</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
