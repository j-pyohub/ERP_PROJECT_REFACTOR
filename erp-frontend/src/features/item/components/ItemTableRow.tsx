import { TableRow, TableCell } from "../../../shared/components/Table";
import type { Item } from "../types/Item";

export function ItemTableRow({ row }: { row: Item }) {
  return (
    <>
      {/* 첫 행 */}
      <TableRow>
        <TableCell>{row.itemCategory}</TableCell>
        <TableCell>{row.itemCode}</TableCell>
        <TableCell>{row.itemName}</TableCell>
        <TableCell>{row.ingredientName}</TableCell>
        <TableCell>{row.supplier}</TableCell>
        <TableCell>{row.itemPrice}</TableCell>
        <TableCell>{row.note || "-"}</TableCell>
      </TableRow>
    </>
  );
}
