import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import PaginationContainer from "../../../shared/components/PaginationForm";
import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
} from "../../../shared/components/Table";
import type { SalesFilterState } from "../types/SalesFilter";
import { fetchSalesList } from "../apis/salesApi";
import type { SalesListItem } from "../types/SalesList";

type Props = {
    filter: SalesFilterState;
    setFilter: React.Dispatch<React.SetStateAction<SalesFilterState>>;
};

const PAGE_SIZE = 10;

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
    const navigate = useNavigate();

    const [storeName, setStoreName] = useState("");
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
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
        setPage(res.data.currentPage);

        // ✅ 핵심 수정 포인트
        setTotalCount(res.data.totalPages * PAGE_SIZE);
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
            {/* 검색 영역 */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <span className="font-medium">조회기간</span>
                    <input
                        type="date"
                        value={filter.from}
                        onChange={(e) =>
                            setFilter((prev) => ({ ...prev, from: e.target.value }))
                        }
                        className="border rounded px-2 py-1 h-9"
                    />
                    <span>~</span>
                    <input
                        type="date"
                        value={filter.to}
                        onChange={(e) =>
                            setFilter((prev) => ({ ...prev, to: e.target.value }))
                        }
                        className="border rounded px-2 py-1 h-9"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-medium">직영점명</span>
                    <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && loadList(1)}
                        placeholder="지점명 검색"
                        className="border rounded px-2 py-1 h-9 w-40"
                    />
                    <Button className="yellow-btn h-9 px-4" onClick={() => loadList(1)}>
                        검색
                    </Button>
                </div>
            </div>

            {/* 테이블 */}
            <Table gridColumns="80px 180px 1fr 120px 120px 140px 140px 60px">
                <TableHeader
                    columns={[
                        "번호",
                        "직영점명",
                        "지역",
                        "전일대비",
                        "주문수",
                        "매출액",
                        "판매날짜",
                        "",
                    ]}
                />

                {list.length === 0 && (
                    <TableRow>
                        <TableCell>
                            <span className="text-gray-500">데이터가 없습니다.</span>
                        </TableCell>
                    </TableRow>
                )}

                {list.map((item, idx) => (
                    <TableRow key={`${item.storeNo}-${item.salesDate}`}>
                        <TableCell>{(page - 1) * PAGE_SIZE + idx + 1}</TableCell>
                        <TableCell>{item.storeName}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.growthRate ?? "-"}</TableCell>
                        <TableCell>{item.orderCount.toLocaleString()}</TableCell>
                        <TableCell>{item.salesAmount.toLocaleString()}</TableCell>
                        <TableCell>{item.salesDate}</TableCell>
                        <TableCell>
                            <img
                                src="/image/detail.png"
                                alt="상세보기"
                                className="detail-icon cursor-pointer mx-auto"
                                onClick={() =>
                                    navigate(
                                        `/sales/detail?storeNo=${item.storeNo}&salesDate=${item.salesDate}`
                                    )
                                }
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            {/* 페이지네이션 */}
            <PaginationContainer
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
                currentPage={page}
                onPageChange={setPage}
            />
        </section>
    );
}
