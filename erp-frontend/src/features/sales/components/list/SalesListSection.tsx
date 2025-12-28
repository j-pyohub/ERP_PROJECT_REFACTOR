import { useEffect, useState } from "react";
import useNavigateTo from "../../../../shared/hooks/useNavigateTo";
import PaginationContainer from "../../../../shared/components/PaginationForm";
import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
} from "../../../../shared/components/Table.tsx";
import type { SalesFilterState } from "../../types/SalesFilter";
import { fetchSalesList } from "../../apis/salesApi";
import type { SalesListItem } from "../../types/SalesList";
import SalesListBar from "./SalesListBar";

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
    const navigateTo = useNavigateTo();

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
            <SalesListBar
                from={filter.from}
                to={filter.to}
                storeName={storeName}
                onChangeFrom={(v) => setFilter((prev) => ({ ...prev, from: v }))}
                onChangeTo={(v) => setFilter((prev) => ({ ...prev, to: v }))}
                onChangeStoreName={setStoreName}
                onSearch={() => loadList(1)}
                onReset={() => {
                    const { from, to } = getDefaultDateRange();
                    setStoreName("");
                    setFilter((prev) => ({ ...prev, from, to }));
                    loadList(1);
                }}
            />

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
                                onClick={navigateTo(
                                    `/sales/detail?storeNo=${item.storeNo}&salesDate=${item.salesDate}`
                                )}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <PaginationContainer
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
                currentPage={page}
                onPageChange={setPage}
            />
        </section>
    );
}
