import ModalLayout from "../../../../shared/components/modal/ModalLayout";
import Button from "../../../../shared/components/Button";
import { Table, TableCell, TableHeader, TableRow } from "../../../../shared/components/Table";


export type StoreMenuItem = {
    storeMenuNo: number;
    menuName: string;
    size: string;
    menuPrice: number;
};

type Props = {
    open: boolean;
    onClose: () => void;

    items: StoreMenuItem[];
    checked: Set<number>;

    onToggleAll: (next: boolean) => void;
    onToggleOne: (storeMenuNo: number, next: boolean) => void;
    onConfirm: () => void;
};

export default function MenuSearchModal({
                                            open,
                                            onClose,
                                            items,
                                            checked,
                                            onToggleAll,
                                            onToggleOne,
                                            onConfirm,
                                        }: Props) {
    if (!open) return null;

    const allChecked =
        items.length > 0 && items.every((m) => checked.has(m.storeMenuNo));

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
            <Table gridColumns="70px 1fr 120px 140px">
                <TableHeader columns={["선택", "메뉴명", "사이즈", "가격(원)"]} />

                {/* 전체 선택 */}
                <TableRow>
                    <TableCell>
                        <input
                            type="checkbox"
                            checked={allChecked}
                            onChange={(e) => onToggleAll(e.target.checked)}
                        />
                    </TableCell>
                    <TableCell>
                        <div className="text-left text-gray-500">전체 선택</div>
                    </TableCell>
                    <TableCell hideText>_</TableCell>
                    <TableCell hideText>_</TableCell>
                </TableRow>

                {items.length === 0 && (
                    <TableRow>
                        <TableCell>
                            <span className="text-gray-500">
                                데이터가 없습니다.
                            </span>
                        </TableCell>
                        <TableCell hideText>_</TableCell>
                        <TableCell hideText>_</TableCell>
                        <TableCell hideText>_</TableCell>
                    </TableRow>
                )}

                {items.map((m) => (
                    <TableRow key={m.storeMenuNo}>
                        <TableCell>
                            <input
                                type="checkbox"
                                checked={checked.has(m.storeMenuNo)}
                                onChange={(e) =>
                                    onToggleOne(
                                        m.storeMenuNo,
                                        e.target.checked
                                    )
                                }
                            />
                        </TableCell>
                        <TableCell>
                            <div className="text-left">{m.menuName}</div>
                        </TableCell>
                        <TableCell>{m.size}</TableCell>
                        <TableCell>{m.menuPrice}</TableCell>
                    </TableRow>
                ))}
            </Table>
        </ModalLayout>
    );
}
