import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
} from "../../../../../shared/components/Table";

export type StoreMenuItem = {
    storeMenuNo: number;
    menuName: string;
    size: string;
    menuPrice: number;
};

type Props = {
    items: StoreMenuItem[];
    checked: Set<number>;
    onToggleAll: (checked: boolean) => void;
    onToggleOne: (storeMenuNo: number, checked: boolean) => void;
};

export default function MenuSearchTable({
                                            items,
                                            checked,
                                            onToggleAll,
                                            onToggleOne,
                                        }: Props) {
    const allChecked =
        items.length > 0 &&
        items.every((m) => checked.has(m.storeMenuNo));

    return (
        <Table gridColumns="70px 1fr 120px 140px">
            <TableHeader columns={["선택", "메뉴명", "사이즈", "가격(원)"]} />

            <TableRow>
                <TableCell>
                    <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={(e) => onToggleAll(e.target.checked)}
                    />
                </TableCell>
                <TableCell>전체 선택</TableCell>
                <TableCell hideText>_</TableCell>
                <TableCell hideText>_</TableCell>
            </TableRow>

            {items.map((m) => (
                <TableRow key={m.storeMenuNo}>
                    <TableCell>
                        <input
                            type="checkbox"
                            checked={checked.has(m.storeMenuNo)}
                            onChange={(e) =>
                                onToggleOne(m.storeMenuNo, e.target.checked)
                            }
                        />
                    </TableCell>
                    <TableCell>{m.menuName}</TableCell>
                    <TableCell>{m.size}</TableCell>
                    <TableCell>{m.menuPrice.toLocaleString()}</TableCell>
                </TableRow>
            ))}
        </Table>
    );
}
