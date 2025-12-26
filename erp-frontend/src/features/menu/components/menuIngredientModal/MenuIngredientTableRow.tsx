import { TableCell, TableRow } from "../../../../shared/components/Table";
import type { Item } from "../../../../shared/types/Item";

interface MenuIngredientTableRowProps {
  item: Item;
  checked: boolean;
  onToggle: (itemNo: number) => void;
}

export function MenuIngredientTableRow({ item, checked, onToggle}: MenuIngredientTableRowProps) {
    return (
        <TableRow>
            <TableCell>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(item.itemNo)}
                />
            </TableCell>
            <TableCell>{item.itemCode}</TableCell>
            <TableCell>{item.ingredientName}</TableCell>
            <TableCell>{item.itemCategory}</TableCell>
            <TableCell>{item.stockUnit}</TableCell>
        </TableRow>
    )
}