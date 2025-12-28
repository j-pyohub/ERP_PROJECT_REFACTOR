import { ItemOrderSelectedTableRow } from "./ItemOrderSelectedTableRow";
import type { OrderItem } from "../../ItemOrderStore";

export function ItemOrderSelectedTableBody({ items }: { items: OrderItem[] }) {
    return (
        <>
            {items.map((item) => (
                <ItemOrderSelectedTableRow key={item.id} row={item} />
            ))}
        </>
    );
}