import { useState } from "react";
import Button from "../../../shared/components/Button";
import apiClient from "../../../shared/apis/apiClient";

type OrderMenu = {
    storeMenuNo: number;
    menuName: string;
    size: string;
    price: number;
    count: number;
};

export default function SalesOrderAddPage() {
    /** 직영점 */
    const [storeNo, setStoreNo] = useState<number | null>(null);
    const [storeName, setStoreName] = useState("");

    /** 주문 메뉴 목록 */
    const [orderMenus, setOrderMenus] = useState<OrderMenu[]>([]);

    /* =========================
       직영점 초기화
    ========================= */
    const handleResetStore = () => {
        setStoreNo(null);
        setStoreName("");
        setOrderMenus([]);
    };

    /* =========================
       메뉴 추가 (임시 – 나중에 모달로 대체)
    ========================= */
    const handleAddMenu = () => {
        if (!storeNo) {
            alert("직영점을 먼저 선택하세요!");
            return;
        }

        // TODO: 메뉴 검색 모달 연결
        alert("메뉴 검색 모달은 다음 단계에서 연결");
    };

    /* =========================
       메뉴 수량 변경
    ========================= */
    const updateMenuCount = (storeMenuNo: number, count: number) => {
        setOrderMenus((prev) =>
            prev.map((m) =>
                m.storeMenuNo === storeMenuNo
                    ? { ...m, count }
                    : m
            )
        );
    };

    /* =========================
       메뉴 삭제
    ========================= */
    const removeMenu = (storeMenuNo: number) => {
        setOrderMenus((prev) =>
            prev.filter((m) => m.storeMenuNo !== storeMenuNo)
        );
    };

    /* =========================
       주문 등록
    ========================= */
    const handleSubmit = async () => {
        if (!storeNo) {
            alert("직영점을 선택하세요.");
            return;
        }

        if (orderMenus.length === 0) {
            alert("메뉴를 1개 이상 선택하세요.");
            return;
        }

        const requestBody = {
            storeNo,
            menuList: orderMenus.map((m) => ({
                storeMenuNo: m.storeMenuNo,
            })),
            detailList: orderMenus.map((m) => ({
                count: m.count,
                price: m.price,
            })),
        };

        try {
            const res = await apiClient.post(
                "/sales/getSalesOrder/addSalesOrder",
                requestBody
            );

            if (res.data.message === "fail") {
                alert("재고 부족으로 주문 등록에 실패했습니다.");
            } else {
                alert("주문 등록이 완료되었습니다.");
                history.back();
            }
        } catch (e) {
            alert("주문 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <section className="w-full max-w-[1200px] mx-auto mt-10">
            <div className="bg-white border rounded p-5 space-y-6">

                {/* 제목 */}
                <h2 className="text-xl font-bold">주문 등록</h2>

                {/* 직영점 선택 */}
                <div className="flex justify-end items-center gap-2">
                    <span className="font-semibold">직영점</span>
                    <input
                        type="text"
                        value={storeName}
                        readOnly
                        className="border rounded px-2 py-1 w-40 bg-gray-100"
                    />
                    <Button className="yellow-btn h-9 px-4">
                        검색
                    </Button>
                    <Button
                        className="white-btn h-9 px-4"
                        onClick={handleResetStore}
                    >
                        초기화
                    </Button>
                </div>

                {/* 메뉴 추가 */}
                <div className="border rounded">
                    <div className="border-b px-4 py-2 font-semibold">
                        메뉴 추가
                    </div>
                    <div className="p-4">
                        <Button
                            className="white-btn h-9 px-4"
                            onClick={handleAddMenu}
                        >
                            검색
                        </Button>
                    </div>
                </div>

                {/* 주문 메뉴 목록 */}
                <div className="border rounded">
                    <div className="border-b px-4 py-2 font-semibold">
                        주문 메뉴 목록
                    </div>

                    <table className="table table-bordered align-middle text-center m-0">
                        <thead className="table-light">
                        <tr>
                            <th style={{ width: "20%" }}>메뉴명</th>
                            <th style={{ width: "15%" }}>사이즈</th>
                            <th style={{ width: "15%" }}>판매 금액(원)</th>
                            <th style={{ width: "15%" }}>판매 수량</th>
                            <th style={{ width: "10%" }}>삭제</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderMenus.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-gray-500">
                                    선택된 메뉴가 없습니다.
                                </td>
                            </tr>
                        )}

                        {orderMenus.map((menu) => (
                            <tr key={menu.storeMenuNo}>
                                <td>{menu.menuName}</td>
                                <td>{menu.size}</td>
                                <td>{menu.price.toLocaleString()}</td>
                                <td>
                                    <input
                                        type="number"
                                        min={1}
                                        value={menu.count}
                                        onChange={(e) =>
                                            updateMenuCount(
                                                menu.storeMenuNo,
                                                Number(e.target.value)
                                            )
                                        }
                                        className="form-control text-end"
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() =>
                                            removeMenu(menu.storeMenuNo)
                                        }
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* 하단 버튼 */}
                <div className="flex justify-end gap-2">
                    <button
                        className="btn btn-success px-4"
                        onClick={handleSubmit}
                    >
                        주문 등록
                    </button>
                    <button
                        className="btn btn-outline-secondary px-4"
                        onClick={() => history.back()}
                    >
                        취소
                    </button>
                </div>
            </div>
        </section>
    );
}
