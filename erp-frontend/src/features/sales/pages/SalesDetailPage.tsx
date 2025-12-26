import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../shared/components/Button";
import PaginationContainer from "../../../shared/components/PaginationForm";
import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
} from "../../../shared/components/Table";
import { fetchSalesDetail } from "../apis/salesApi";
import type { SalesDetailItem } from "../types/SalesDetail";

const PAGE_SIZE = 10;

export default function SalesDetailPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const storeNo = Number(params.get("storeNo"));
    const salesDate = params.get("salesDate") ?? "";

    const [list, setList] = useState<SalesDetailItem[]>([]);
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (!storeNo || !salesDate) return;

        fetchSalesDetail(storeNo, salesDate).then((res) => {
            setList(res.data);
            setTotalCount(res.data.length); // ✅ 전체 개수
            setPage(1);
        });
    }, [storeNo, salesDate]);

    /** 검색 적용된 리스트 */
    const filteredList = useMemo(() => {
        return searchKeyword
            ? list.filter((x) => x.menuName.includes(searchKeyword))
            : list;
    }, [list, searchKeyword]);

    /** 현재 페이지 데이터 */
    const pagedList = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filteredList.slice(start, start + PAGE_SIZE);
    }, [filteredList, page]);

    useEffect(() => {
        setTotalCount(filteredList.length);
        setPage(1);
    }, [filteredList]);

    return (
        <section className="w-full max-w-[1500px] mx-auto px-4 py-4 space-y-4">
            <h4 className="text-center text-lg font-semibold">
                판매 상품 목록
            </h4>

            {/* 상단 영역 */}
            <div className="flex justify-between items-center">
                <Button
                    className="yellow-btn h-9 px-4"
                    onClick={() => navigate(-1)}
                >
                    뒤로가기
                </Button>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="판매상품 검색"
                        className="border rounded px-2 py-1 h-9 w-60"
                    />
                    <Button
                        className="yellow-btn h-9 px-4"
                        onClick={() => setSearchKeyword(keyword)}
                    >
                        검색
                    </Button>
                </div>
            </div>

            {/* 테이블 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
                <Table gridColumns="80px 120px 1fr 100px 120px 140px">
                    <TableHeader
                        columns={[
                            "번호",
                            "카테고리",
                            "판매상품",
                            "사이즈",
                            "판매수량",
                            "매출액",
                        ]}
                    />

                    {pagedList.length === 0 && (
                        <TableRow>
                            <TableCell>
                                <span className="text-gray-500">
                                    데이터가 없습니다.
                                </span>
                            </TableCell>
                        </TableRow>
                    )}

                    {pagedList.map((item, idx) => (
                        <TableRow key={`${item.menuName}-${idx}`}>
                            <TableCell>
                                {(page - 1) * PAGE_SIZE + idx + 1}
                            </TableCell>
                            <TableCell>{item.menuCategory}</TableCell>
                            <TableCell>{item.menuName}</TableCell>
                            <TableCell>{item.size}</TableCell>
                            <TableCell>{item.menuCount.toLocaleString()}</TableCell>
                            <TableCell>{item.totalPrice.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </Table>

                <PaginationContainer
                    totalCount={totalCount}
                    pageSize={PAGE_SIZE}
                    currentPage={page}
                    onPageChange={setPage}
                />
            </div>
        </section>
    );
}
