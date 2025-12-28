import Button from "../../../../shared/components/Button";

export type OrderRow = {
    storeMenuNo: number;
    menuName: string;
    size: string;
    menuPrice: number;
    qty: number;
};

type Props = {
    rows: OrderRow[];
    onChangeQty: (storeMenuNo: number, qty: number) => void;
    onRemove: (storeMenuNo: number) => void;
};

export default function OrderMenuTable({
                                           rows,
                                           onChangeQty,
                                           onRemove,
                                       }: Props) {
    return (
        <div className="overflow-auto">
            <table className="min-w-[900px] w-full border-collapse border text-center">
                <thead>
                <tr className="bg-gray-50">
                    <th className="border px-3 py-2 w-[20%]">메뉴명</th>
                    <th className="border px-3 py-2 w-[15%]">사이즈</th>
                    <th className="border px-3 py-2 w-[15%]">판매 금액(원)</th>
                    <th className="border px-3 py-2 w-[15%]">판매 수량</th>
                    <th className="border px-3 py-2 w-[10%]">삭제</th>
                </tr>
                </thead>

                <tbody>
                {rows.length === 0 && (
                    <tr>
                        <td
                            className="border px-3 py-6 text-gray-500"
                            colSpan={5}
                        >
                            메뉴를 선택하세요.
                        </td>
                    </tr>
                )}

                {rows.map((row) => (
                    <tr key={row.storeMenuNo}>
                        <td className="border px-3 py-2 text-left">
                            {row.menuName}
                        </td>
                        <td className="border px-3 py-2">{row.size}</td>
                        <td className="border px-3 py-2">
                            {row.menuPrice}
                        </td>
                        <td className="border px-3 py-2">
                            <input
                                type="number"
                                min={1}
                                className="border rounded px-2 py-1 h-9 w-28 text-right"
                                value={row.qty}
                                onChange={(e) =>
                                    onChangeQty(
                                        row.storeMenuNo,
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </td>
                        <td className="border px-3 py-2">
                            <Button
                                className="red-btn h-9 px-3"
                                onClick={() => onRemove(row.storeMenuNo)}
                            >
                                삭제
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
