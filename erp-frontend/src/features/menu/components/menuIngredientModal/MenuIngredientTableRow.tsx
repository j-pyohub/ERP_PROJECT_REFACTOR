import { TableCell, TableRow } from "../../../../shared/components/Table";
import type { Item } from "../../../../shared/types/Item";

interface MenuIngredientTableRowProps {
  item: Item;
  checked: boolean;
  onCheck: (itemNo: number) => void;
}

export function MenuIngredientTableRow({ item, checked, onCheck}: MenuIngredientTableRowProps) {
    return (
        <TableRow>
            <TableCell>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onCheck(item.itemNo)}
                />
            </TableCell>
            <TableCell>{item.itemCode}</TableCell>
            <TableCell>{item.ingredientName}</TableCell>
            <TableCell>{item.itemCategory}</TableCell>
            <TableCell>{item.stockUnit}</TableCell>
        </TableRow>
    )
}