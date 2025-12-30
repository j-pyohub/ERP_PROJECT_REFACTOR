import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/Button";

import StoreSearchModal from "../../../shared/components/storeModal/StoreSearchModal";
import MenuSearchModal from "../components/order/menuSearchModal/MenuSearchModal";
import OrderMenuTable from "../components/order/OrderMenuTable";

import { useSalesOrderStore } from "../stores/salesOrderStore";
import type { StoreMenuItem } from "../types/StoreMenuItem";

import {
    fetchStoreMenu,
    createSalesOrder,
} from "../apis/salesApi";

let rowSeq = 0;

function createRowId() {
    rowSeq += 1;
    return Date.now() + rowSeq;
}

export default function SalesOrderAddPage() {
    const navigate = useNavigate();

    /* ================= modal state ================= */
    const [storeModalOpen, setStoreModalOpen] = useState(false);
    const [menuModalOpen, setMenuModalOpen] = useState(false);

    /* ================= store (zustand) ================= */
    const {
        storeNo,
        storeName,
        orderRows,
        setStore,
        addOrderRow,
        updateQuantity,
        removeOrderRow,
        reset,
    } = useSalesOrderStore();

    /* ================= menu modal local state ================= */
    const [menuList, setMenuList] = useState<StoreMenuItem[]>([]);
    const [checked, setChecked] = useState<Set<number>>(new Set());

    /* 이미 주문에 들어간 메뉴 비활성화 */
    const disabledSet = new Set(
        orderRows.map((r) => r.storeMenuNo)
    );

    /* ================= menu fetch ================= */
    useEffect(() => {
        if (!menuModalOpen || !storeNo) return;

        fetchStoreMenu(storeNo).then((res) => {
            setMenuList(res.data);
            setChecked(new Set());
        });
    }, [menuModalOpen, storeNo]);

    /* ================= menu select logic ================= */
    function toggleAllMenu(next: boolean) {
        if (!next) {
            setChecked(new Set());
            return;
        }

        const selectable = menuList
            .filter((m) => !disabledSet.has(m.storeMenuNo))
            .map((m) => m.storeMenuNo);

        setChecked(new Set(selectable));
    }

    function toggleOneMenu(storeMenuNo: number, next: boolean) {
        setChecked((prev) => {
            const copy = new Set(prev);
            next ? copy.add(storeMenuNo) : copy.delete(storeMenuNo);
            return copy;
        });
    }

    function confirmMenu() {
        const exist = new Set(orderRows.map((r) => r.storeMenuNo));

        menuList
            .filter((m) => checked.has(m.storeMenuNo))
            .filter((m) => !exist.has(m.storeMenuNo))
            .forEach((m) =>
                addOrderRow({
                    rowId: createRowId(),
                    storeMenuNo: m.storeMenuNo,
                    menuName: m.menuName,
                    size: m.size,
                    unitPrice: m.menuPrice,
                    quantity: 1,
                    totalPrice: m.menuPrice,
                })g
            );


        setMenuModalOpen(false);
    }


    const totalAmount = orderRows.reduce(
        (sum, row) => sum + row.totalPrice,
        0
    );

    async function submitOrder() {
        if (!storeNo) {
            alert("직영점을 선택하세요.");
            return;
        }

        if (orderRows.length === 0) {
            alert("메뉴를 1개 이상 선택하세요.");
            return;
        }

        await createSalesOrder(storeNo, orderRows);

        reset();
        navigate(-1);
    }

    return (
        <section className="w-full max-w-[1500px] mx-auto px-4 py-4 space-y-4">
            <h2 className="text-xl font-semibold">주문 등록</h2>

            {/* ================= store ================= */}
            <div className="flex justify-end gap-2">
                <span className="font-semibold">직영점</span>
                <input
                    className="border rounded px-2 h-9 w-[150px]"
                    value={storeName}
                    readOnly
                />
                <Button
                    className="yellow-btn h-9"
                    onClick={() => setStoreModalOpen(true)}
                >
                    검색
                </Button>
                <Button
                    className="white-btn h-9"
                    onClick={reset}
                >
                    초기화
                 </Button>
            </div>


            <div className="section-box flex justify-between items-center">
                <div className="font-semibold">메뉴 추가</div>
                <Button
                    className="yellow-btn h-9"
                    onClick={() => {
                        if (!storeNo) {
                            alert("직영점을 먼저 선택하세요.");
                            return;
                        }
                        setMenuModalOpen(true);
                    }}
                >
                    메뉴 추가
                </Button>
            </div>


            <OrderMenuTable
                rows={orderRows}
                onChangeQty={updateQuantity}
                onRemove={removeOrderRow}
            />


            <div className="section-box flex justify-end items-center gap-6">
                <span className="text-lg font-semibold">
                    총 주문 금액
                </span>
                <span className="text-2xl font-bold ">
                    {totalAmount.toLocaleString()} 원
                </span>
            </div>


            <div className="flex justify-end gap-2">
                <Button
                    className="yellow-btn h-10"
                    onClick={submitOrder}
                >
                    주문 등록
                </Button>
                <Button
                    className="white-btn h-10"
                    onClick={() => {
                        reset();
                        navigate(-1);
                    }}
                >
                    취소
                </Button>
            </div>


            <StoreSearchModal
                open={storeModalOpen}
                onClose={() => setStoreModalOpen(false)}
                onSelect={(no, name) => {
                    setStore(no, name);
                    setStoreModalOpen(false);
                }}
            />

            <MenuSearchModal
                open={menuModalOpen}
                items={menuList}
                checked={checked}
                disabledSet={disabledSet}
                onClose={() => setMenuModalOpen(false)}
                onToggleAll={toggleAllMenu}
                onToggleOne={toggleOneMenu}
                onConfirm={confirmMenu}
            />
        </section>
    );
}
