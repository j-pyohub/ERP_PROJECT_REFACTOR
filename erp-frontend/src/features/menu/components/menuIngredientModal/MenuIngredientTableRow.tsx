import { TableCell, TableRow } from "../../../../shared/components/Table";
import type { Item } from "../../../../shared/types/Item";

interface MenuIngredientTableRowProps {
  item: Item;
  sizeYn: "Y" | "N";
  onRemove: () => void;
}

export function MenuIngredientTableRow({ item,  sizeYn, onRemove,}: MenuIngredientTableRowProps) {
    return (
        <TableRow>
            <TableCell>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onCheck}
                />
            </TableCell>
            <TableCell>{item.itemCode}</TableCell>
            <TableCell>{item.ingredientName}</TableCell>
            <TableCell>{item.itemCategory}</TableCell>
            <TableCell>{item.stockUnit}</TableCell>
        </TableRow>
    )
}