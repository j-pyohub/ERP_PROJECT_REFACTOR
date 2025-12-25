import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type SalesDetailRow = {
    menuCategory: string;
    menuName: string;
    size: string;
    menuCount: number;
    totalPrice: number;
};

const DUMMY_DATA: SalesDetailRow[] = [
    {
        menuCategory: "피자",
        menuName: "불고기피자",
        size: "L",
        menuCount: 12,
        totalPrice: 180000,
    },
    {
        menuCategory: "피자",
        menuName: "페퍼로니피자",
        size: "M",
        menuCount: 8,
        totalPrice: 112000,
    },
    {
        menuCategory: "사이드",
        menuName: "치즈스틱",
        size: "-",
        menuCount: 15,
        totalPrice: 45000,
    },
];

export default function SalesDetailPage() {
    const navigate = useNavigate();
    const { storeNo, salesDate } = useParams<{
        storeNo: string;
        salesDate: string;
    }>();

    const [keyword, setKeyword] = useState("");

    return (
        <>
            <h4 className="text-center my-4">
                매출 상세 조회
            </h4>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => navigate(-1)}
                >
                    뒤로가기
                </button>

                <input
                    type="text"
                    className="form-control form-control-sm"
                    style={{ width: 240 }}
                    placeholder="판매상품 검색"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            <div className="border rounded bg-white p-3">
                <table className="table table-hover text-center align-middle mb-0">
                    <thead className="table-light">
                    <tr>
                        <th>번호</th>
                        <th>카테고리</th>
                        <th>판매상품</th>
                        <th>사이즈</th>
                        <th>판매수량</th>
                        <th>매출액</th>
                    </tr>
                    </thead>
                    <tbody>
                    {DUMMY_DATA.map((row, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{row.menuCategory}</td>
                            <td>{row.menuName}</td>
                            <td>{row.size}</td>
                            <td>{row.menuCount.toLocaleString()}</td>
                            <td>{row.totalPrice.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="text-muted mt-2">
                    storeNo: {storeNo} / salesDate: {salesDate}
                </div>
            </div>
        </>
    );
}
