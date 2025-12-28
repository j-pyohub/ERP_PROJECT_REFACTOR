import Button from "../../../../shared/components/Button";
import { TableRow, TableCell } from "../../../../shared/components/Table";
import { useItemOrderStore } from "../../ItemOrderStore";
import type { OrderItem } from "../../ItemOrderStore";

export function ItemOrderSelectedTableRow({ row }: { row: OrderItem }) {
    const { removeItemOrder } = useItemOrderStore();

    return (
        <TableRow>
            <TableCell>{row.itemName}</TableCell>
            <TableCell>{row.supplyUnit}</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>{(row.price * row.quantity).toLocaleString()}</TableCell>
            <TableCell>
                <Button className="btn-sm btn-danger" onClick={() => removeItemOrder(row.id)}>삭제</Button>
            </TableCell>
        </TableRow>
    );
}