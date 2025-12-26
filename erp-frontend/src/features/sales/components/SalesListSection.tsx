import { useEffect, useState } from "react";
import Button from "../../../shared/components/Button";
import { Table, TableHeader, TableRow, TableCell } from "../../../shared/components/Table";
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

    useEffect(() => {
        if (!filter.from || !filter.to) {
            setFilter((prev) => ({ ...prev, ...getDefaultDateRange() }));
            return;
        }
        loadList(1);
    }, [filter.from, filter.to]);

    return (
        <section className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <h6 className="text-sm font-semibold">
                직영점별 매출 리스트
            </h6>

            <div className="flex flex-wrap items-end gap-4">
                <div>
                    <label className="block text-xs font-medium mb-1">
                        기간 From
                    </label>
                    <input
                        type="date"
                        value={filter.from}
                        onChange={(e) =>
                            setFilter((prev) => ({ ...prev, from: e.target.value }))
                        }
                        className="border rounded px-2 py-1 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1">
                        기간 To
                    </label>
                    <input
                        type="date"
                        value={filter.to}
                        onChange={(e) =>
                            setFilter((prev) => ({ ...prev, to: e.target.value }))
                        }
                        className="border rounded px-2 py-1 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1">
                        지점명
                    </label>
                    <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && loadList(1)}
                        className="border rounded px-2 py-1 text-sm"
                    />
                </div>

                <Button onClick={() => loadList(1)}>
                    조회
                </Button>
            </div>

            <Table
                gridColumns="80px 180px 1fr 120px 120px 140px 140px"
            >
                <TableHeader
                    columns={[
                        "번호",
                        "직영점명",
                        "지역",
                        "전일대비",
                        "주문수",
                        "매출액",
                        "판매날짜",
                    ]}
                />

                {list.length === 0 && (
                    <TableRow>
                        <TableCell hideTopBorder hideBottomBorder />
                        <TableCell hideTopBorder hideBottomBorder />
                        <TableCell hideTopBorder hideBottomBorder>
                            <span className="text-gray-500">
                                데이터가 없습니다.
                            </span>
                        </TableCell>
                        <TableCell hideTopBorder hideBottomBorder />
                        <TableCell hideTopBorder hideBottomBorder />
                        <TableCell hideTopBorder hideBottomBorder />
                        <TableCell hideTopBorder hideBottomBorder />
                    </TableRow>
                )}

                {list.map((item, idx) => (
                    <TableRow key={`${item.storeNo}-${item.salesDate}`}>
                        <TableCell>
                            {(page - 1) * 10 + idx + 1}
                        </TableCell>
                        <TableCell>
                            {item.storeName}
                        </TableCell>
                        <TableCell>
                            {item.address}
                        </TableCell>
                        <TableCell>
                            {item.growthRate ?? "-"}
                        </TableCell>
                        <TableCell>
                            {item.orderCount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                            {item.salesAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                            {item.salesDate}
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <div className="flex justify-center gap-1 pt-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNo = i + 1;
                    const isActive = page === pageNo;

                    return (
                        <button
                            key={pageNo}
                            onClick={() => loadList(pageNo)}
                            className={`px-3 py-1 text-sm rounded border transition
                                ${
                                isActive
                                    ? "bg-yellow-400 text-black font-semibold"
                                    : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {pageNo}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
