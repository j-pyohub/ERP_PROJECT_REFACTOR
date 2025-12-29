import Button from "../../../../shared/components/Button";
import type { OrderRow } from "../../types/OrderRow";

type Props = {
    rows: OrderRow[];
    onChangeQty: (rowId: string, qty: number) => void;
    onRemove: (rowId: string) => void;
};

export default function OrderMenuTable({
                                           rows,
                                           onChangeQty,
                                           onRemove,
                                       }: Props) {
    return (
        <div className="section-box">
            <div className="font-semibold mb-3">주문 메뉴 목록</div>

            <div className="overflow-auto">
                <table className="min-w-[1000px] w-full border-collapse border text-center">
                    <thead>
                    <tr className="bg-gray-50">
                        <th className="border px-3 py-2 w-[20%]">메뉴명</th>
                        <th className="border px-3 py-2 w-[10%]">사이즈</th>
                        <th className="border px-3 py-2 w-[15%]">단가(원)</th>
                        <th className="border px-3 py-2 w-[15%]">수량</th>
                        <th className="border px-3 py-2 w-[15%]">금액(원)</th>
                        <th className="border px-3 py-2 w-[10%]">삭제</th>
                    </tr>
                    </thead>

                    <tbody>
                    {rows.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="border px-3 py-6 text-gray-500"
                            >
                                메뉴를 선택하세요.
                            </td>
                        </tr>
                    )}

                    {rows.map((row) => (
                        <tr key={row.rowId}>
                            <td className="border px-3 py-2 text-left">
                                {row.menuName}
                            </td>
                            <td className="border px-3 py-2">
                                {row.size}
                            </td>
                            <td className="border px-3 py-2 text-right">
                                {row.unitPrice.toLocaleString()}
                            </td>
                            <td className="border px-3 py-2">
                                <input
                                    type="number"
                                    min={1}
                                    className="border rounded px-2 py-1 h-9 w-24 text-right"
                                    value={row.quantity}
                                    onChange={(e) =>
                                        onChangeQty(
                                            row.rowId,
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </td>
                            <td className="border px-3 py-2 text-right font-semibold">
                                {row.totalPrice.toLocaleString()}
                            </td>
                            <td className="border px-3 py-2">
                                <Button
                                    className="red-btn h-9 px-3"
                                    onClick={() =>
                                        onRemove(row.rowId)
                                    }
                                >
                                    삭제
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
