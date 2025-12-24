import { useEffect, useState } from "react";
import { fetchSalesList } from "../apis/salesApi";
import type { SalesListItem } from "../types/SalesList";

export default function SalesListSection() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [storeName, setStoreName] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState<SalesListItem[]>([]);

    /**
     * 리스트 조회
     */
    const loadList = async (
        targetPage = 1,
        startDate = from,
        endDate = to
    ) => {
        if (!startDate || !endDate) return;

        const res = await fetchSalesList({
            startDate,
            endDate,
            storeName: storeName || undefined,
            page: targetPage,
        });

        setList(res.data.list);
        setTotalPages(res.data.totalPages);
        setPage(res.data.currentPage);
    };

    /**
     * 최초 진입 시: 이번 달 기본 기간 세팅 + 자동 조회
     */
    useEffect(() => {
        const today = new Date();

        let start: Date;
        let end: Date;

        if (today.getDate() === 1) {
            // 매월 1일이면 전월 전체
            start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            end = new Date(today.getFullYear(), today.getMonth(), 0);
        } else {
            // 그 외: 이번 달 1일 ~ 어제
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = new Date(today);
            end.setDate(end.getDate() - 1);
        }

        const toDate = (d: Date) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                d.getDate()
            ).padStart(2, "0")}`;

        const startStr = toDate(start);
        const endStr = toDate(end);

        setFrom(startStr);
        setTo(endStr);

        // ✅ 최초 1회 자동 조회
        loadList(1, startStr, endStr);
    }, []);

    /**
     * 조회 버튼 클릭
     */
    const handleSearch = () => {
        setPage(1);
        loadList(1);
    };

    return (
        <div className="section-box mt-3">
            <h6 className="fw-bold mb-3">직영점별 매출 리스트</h6>

            {/* 조회 조건 */}
            <div className="d-flex gap-2 mb-3 align-items-end flex-wrap">
                <div>
                    <label className="form-label fw-semibold">시작일</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div>

                <div>
                    <label className="form-label fw-semibold">종료일</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>

                <div>
                    <label className="form-label fw-semibold">직영점명</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="지점명"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
                    />
                </div>

                <button className="btn btn-sm btn-warning" onClick={handleSearch}>
                    조회
                </button>
            </div>

            {/* 리스트 테이블 */}
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
                {list.length === 0 ? (
                    <tr>
                        <td colSpan={8} className="text-center">
                            데이터가 없습니다.
                        </td>
                    </tr>
                ) : (
                    list.map((item, idx) => (
                        <tr
                            key={`${item.storeNo}-${item.salesDate}`}
                            className="text-center"
                        >
                            <td>{(page - 1) * 10 + idx + 1}</td>
                            <td>{item.storeName}</td>
                            <td className="text-start">{item.address}</td>
                            <td>{item.growthRate ?? "-"}</td>
                            <td>{item.orderCount.toLocaleString()}</td>
                            <td>{item.salesAmount.toLocaleString()}</td>
                            <td>{item.salesDate}</td>
                            <td>상세</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="d-flex justify-content-center mt-3 gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        className={`btn btn-sm ${
                            page === i + 1
                                ? "btn-warning"
                                : "btn-outline-secondary"
                        }`}
                        onClick={() => loadList(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
