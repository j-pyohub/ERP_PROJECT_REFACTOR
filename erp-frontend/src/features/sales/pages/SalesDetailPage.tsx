import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { Table, TableHeader, TableRow, TableCell } from "../../../shared/components/Table";
import { fetchSalesDetail } from "../apis/salesApi";
import type { SalesDetailItem } from "../types/SalesDetail";

export default function SalesDetailPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const storeNo = Number(params.get("storeNo"));
    const salesDate = params.get("salesDate") ?? "";

    const [list, setList] = useState<SalesDetailItem[]>([]);

    const [inputKeyword, setInputKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        if (!storeNo || !salesDate) return;

        fetchSalesDetail(storeNo, salesDate).then((res) => {
            setList(res.data);
            setPage(1);
            setSearchKeyword("");   // 초기 검색어 리셋
            setInputKeyword("");
        });
    }, [storeNo, salesDate]);

    const filtered = useMemo(() => {
        return searchKeyword
            ? list.filter((x) => x.menuName.includes(searchKeyword))
            : list;
    }, [list, searchKeyword]);

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const pagedList = filtered.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handleSearch = () => {
        setSearchKeyword(inputKeyword);
        setPage(1);
    };

    return (
        <section className="w-full max-w-[1500px] mx-auto px-4 py-4 space-y-4">

            <h4 className="text-center text-lg font-semibold">
                판매 상품 목록
            </h4>

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
                        value={inputKeyword}
                        onChange={(e) => setInputKeyword(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                        placeholder="판매상품 검색"
                        className="border rounded px-2 py-1 h-9 w-60"
                    />
                    <Button
                        className="yellow-btn h-9 px-4"
                        onClick={handleSearch}
                    >
                        검색
                    </Button>
                </div>
            </div>

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

                    {pagedList.map((item, idx) => (
                        <TableRow key={`${item.menuName}-${idx}`}>
                            <TableCell>{(page - 1) * rowsPerPage + idx + 1}</TableCell>
                            <TableCell>{item.menuCategory}</TableCell>
                            <TableCell>{item.menuName}</TableCell>
                            <TableCell>{item.size}</TableCell>
                            <TableCell>{item.menuCount.toLocaleString()}</TableCell>
                            <TableCell>{item.totalPrice.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </Table>

                {pagedList.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                        데이터가 없습니다.
                    </div>
                )}

                <div className="flex justify-center gap-1 pt-3">
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNo = i + 1;
                        return (
                            <button
                                key={pageNo}
                                onClick={() => setPage(pageNo)}
                                className={`px-3 py-1 text-sm rounded border
                                  ${
                                    page === pageNo
                                        ? "bg-yellow-400 font-semibold"
                                        : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {pageNo}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
