import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../../../shared/apis/apiClient";
import Button from "../../../shared/components/Button";
import ModalLayout from "../../../shared/components/modal/ModalLayout";
import StoreSearchModal from "../../../shared/components/storeModal/StoreSearchModal";
import OrderMenuTable, { type OrderRow } from "../components/order/OrderMenuTable";


type StoreMenuItem = {
    storeMenuNo: number;
    menuName: string;
    size: string;
    menuPrice: number;
};

type AlertState = {
    open: boolean;
    message: string;
    onClose?: () => void;
};


function AlertModal({
                        open,
                        message,
                        onClose,
                    }: {
    open: boolean;
    message: string;
    onClose: () => void;
}) {
    if (!open) return null;

    return (
        <ModalLayout
            title="알림"
            onClose={onClose}
            footer={
                <Button className="yellow-btn" onClick={onClose}>
                    확인
                </Button>
            }
        >
            <div className="min-w-[320px] px-2">
                <p className="text-base font-semibold text-gray-800">{message}</p>
            </div>
        </ModalLayout>
    );
}


function MenuSearchModal({
                             open,
                             onClose,
                             items,
                             checked,
                             onToggleAll,
                             onToggleOne,
                             onConfirm,
                         }: {
    open: boolean;
    onClose: () => void;
    items: StoreMenuItem[];
    checked: Set<number>;
    onToggleAll: (next: boolean) => void;
    onToggleOne: (storeMenuNo: number, next: boolean) => void;
    onConfirm: () => void;
}) {
    const allChecked =
        items.length > 0 && items.every((m) => checked.has(m.storeMenuNo));

    if (!open) return null;

    return (
        <ModalLayout
            title="메뉴 선택"
            onClose={onClose}
            footer={
                <Button
                    className="yellow-btn"
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                >
                    선택 완료
                </Button>
            }
        >
            <table className="w-full border text-center">
                <thead>
                <tr className="bg-gray-50">
                    <th className="border px-2 py-2">선택</th>
                    <th className="border px-2 py-2">메뉴명</th>
                    <th className="border px-2 py-2">사이즈</th>
                    <th className="border px-2 py-2">가격</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border">
                        <input
                            type="checkbox"
                            checked={allChecked}
                            onChange={(e) => onToggleAll(e.target.checked)}
                        />
                    </td>
                    <td className="border text-left px-2" colSpan={3}>
                        전체 선택
                    </td>
                </tr>

                {items.length === 0 && (
                    <tr>
                        <td className="border py-4 text-gray-500" colSpan={4}>
                            데이터가 없습니다.
                        </td>
                    </tr>
                )}

                {items.map((m) => (
                    <tr key={m.storeMenuNo}>
                        <td className="border">
                            <input
                                type="checkbox"
                                checked={checked.has(m.storeMenuNo)}
                                onChange={(e) =>
                                    onToggleOne(m.storeMenuNo, e.target.checked)
                                }
                            />
                        </td>
                        <td className="border text-left px-2">{m.menuName}</td>
                        <td className="border">{m.size}</td>
                        <td className="border">{m.menuPrice}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </ModalLayout>
    );
}


export default function SalesOrderAddPage() {
    const navigate = useNavigate();

    const [storeModalOpen, setStoreModalOpen] = useState(false);
    const [menuModalOpen, setMenuModalOpen] = useState(false);

    const [storeNo, setStoreNo] = useState<number | null>(null);
    const [storeName, setStoreName] = useState("");

    const [menuList, setMenuList] = useState<StoreMenuItem[]>([]);
    const [checkedMenus, setCheckedMenus] = useState<Set<number>>(new Set());
    const [orderRows, setOrderRows] = useState<OrderRow[]>([]);

    const [alert, setAlert] = useState<AlertState>({
        open: false,
        message: "",
    });


    function showAlert(message: string, onClose?: () => void) {
        setAlert({ open: true, message, onClose });
    }

    function closeAlert() {
        setAlert((prev) => {
            prev.onClose?.();
            return { open: false, message: "" };
        });
    }

    function resetAll() {
        setStoreNo(null);
        setStoreName("");
        setMenuList([]);
        setCheckedMenus(new Set());
        setOrderRows([]);
    }


    async function loadMenuList(targetStoreNo: number) {
        const res = await apiClient.get<StoreMenuItem[]>(
            `/storeMenu/getStoreMenu/${targetStoreNo}`
        );
        setMenuList(res.data);
    }

    useEffect(() => {
        if (!menuModalOpen || !storeNo) return;

        loadMenuList(storeNo).catch(() =>
            showAlert("메뉴 목록 조회에 실패했습니다.")
        );
        setCheckedMenus(new Set());
    }, [menuModalOpen, storeNo]);


    function toggleAllMenus(next: boolean) {
        if (!next) {
            setCheckedMenus(new Set());
            return;
        }
        setCheckedMenus(new Set(menuList.map((m) => m.storeMenuNo)));
    }

    function toggleOneMenu(storeMenuNo: number, next: boolean) {
        setCheckedMenus((prev) => {
            const copy = new Set(prev);
            next ? copy.add(storeMenuNo) : copy.delete(storeMenuNo);
            return copy;
        });
    }

    function confirmMenuSelection() {
        setOrderRows((prev) => {
            const exists = new Set(prev.map((r) => r.storeMenuNo));
            const added: OrderRow[] = [];

            menuList.forEach((m) => {
                if (!checkedMenus.has(m.storeMenuNo)) return;
                if (exists.has(m.storeMenuNo)) return;

                added.push({
                    storeMenuNo: m.storeMenuNo,
                    menuName: m.menuName,
                    size: m.size,
                    menuPrice: m.menuPrice,
                    qty: 1,
                });
            });

            return [...prev, ...added];
        });
    }


    return (
        <section className="w-full max-w-[1500px] mx-auto px-4 py-3">
            <div className="section-box space-y-4">
                <h2 className="text-xl font-semibold">주문 등록</h2>

                {/* 직영점 */}
                <div className="flex items-center justify-end gap-2">
                    <span className="font-semibold">직영점</span>
                    <input
                        className="border rounded px-2 py-1 h-9 w-[150px]"
                        value={storeName}
                        readOnly
                    />
                    <Button
                        className="yellow-btn h-9"
                        onClick={() => setStoreModalOpen(true)}
                    >
                        검색
                    </Button>
                    <Button className="white-btn h-9" onClick={resetAll}>
                        초기화
                    </Button>
                </div>

                <div className="section-box">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold">메뉴 추가</div>
                        <Button
                            className="yellow-btn h-9"
                            onClick={() => {
                                if (!storeNo) {
                                    showAlert("직영점을 먼저 선택하세요!");
                                    return;
                                }
                                setMenuModalOpen(true);
                            }}
                        >
                            검색
                        </Button>
                    </div>
                </div>


                <div className="section-box">
                    <div className="font-semibold mb-3">주문 메뉴 목록</div>
                    <OrderMenuTable
                        rows={orderRows}
                        onChangeQty={(no, qty) =>
                            setOrderRows((prev) =>
                                prev.map((r) =>
                                    r.storeMenuNo === no ? { ...r, qty } : r
                                )
                            )
                        }
                        onRemove={(no) =>
                            setOrderRows((prev) =>
                                prev.filter((r) => r.storeMenuNo !== no)
                            )
                        }
                    />
                </div>


                <div className="flex justify-end gap-2">
                    <Button className="yellow-btn h-10">주문 등록</Button>
                    <Button
                        className="white-btn h-10"
                        onClick={() => navigate(-1)}
                    >
                        취소
                    </Button>
                </div>
            </div>

            {/* 모달 */}
            <StoreSearchModal
                open={storeModalOpen}
                onClose={() => setStoreModalOpen(false)}
                onSelect={(no, name) => {
                    setStoreNo(no);
                    setStoreName(name);
                    setOrderRows([]);
                }}
            />

            <MenuSearchModal
                open={menuModalOpen}
                onClose={() => setMenuModalOpen(false)}
                items={menuList}
                checked={checkedMenus}
                onToggleAll={toggleAllMenus}
                onToggleOne={toggleOneMenu}
                onConfirm={confirmMenuSelection}
            />

            <AlertModal
                open={alert.open}
                message={alert.message}
                onClose={closeAlert}
            />
        </section>
    );
}
