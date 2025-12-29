import {
    Table,
    TableRow,
    TableCell,
} from "../../../../../shared/components/Table";

import type { StoreMenuItem } from "../../../types/StoreMenuItem";

type Props = {
    items: StoreMenuItem[];
    checked: Set<number>;
    disabledSet: Set<number>;
    onToggleAll: (checked: boolean) => void;
    onToggleOne: (storeMenuNo: number, checked: boolean) => void;
};

export default function MenuSearchTable({
                                            items,
                                            checked,
                                            disabledSet,
                                            onToggleAll,
                                            onToggleOne,
                                        }: Props) {
    const selectableItems = items.filter(
        (m) => !disabledSet.has(m.storeMenuNo)
    );

    const allChecked =
        selectableItems.length > 0 &&
        selectableItems.every((m) =>
            checked.has(m.storeMenuNo)
        );

    return (
        <Table gridColumns="70px 1fr 120px 140px">

            <TableRow>
                <TableCell>
                    <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={(e) =>
                            onToggleAll(e.target.checked)
                        }
                    />
                </TableCell>
                <TableCell>메뉴명</TableCell>
                <TableCell>사이즈</TableCell>
                <TableCell>가격(원)</TableCell>
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


            {items.map((m) => {
                const isDisabled = disabledSet.has(
                    m.storeMenuNo
                );

                return (
                    <TableRow key={m.storeMenuNo}>
                        <TableCell>
                            <input
                                type="checkbox"
                                checked={
                                    !isDisabled &&
                                    checked.has(m.storeMenuNo)
                                }
                                disabled={isDisabled}
                                onChange={(e) =>
                                    onToggleOne(
                                        m.storeMenuNo,
                                        e.target.checked
                                    )
                                }
                            />
                        </TableCell>
                        <TableCell>{m.menuName}</TableCell>
                        <TableCell>{m.size}</TableCell>
                        <TableCell>
                            {m.menuPrice.toLocaleString()}
                        </TableCell>
                    </TableRow>
                );
            })}
        </Table>
    );
}
