import type { Item } from "../types/Item";
import { ItemTableRow } from "./ItemTableRow";

export function ItemTableBody({ items }: { items: Item[] }) {
  return (
    <>
        {items?.map(item => (
                <ItemTableRow key={item.itemCode} row={item} />
            ))
        }
    </>
  );
}
