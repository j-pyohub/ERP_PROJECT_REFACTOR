import Button from "../../../../shared/components/Button";
import { TableCell, TableRow } from "../../../../shared/components/Table";
import type { Item } from "../../types/Item";
import { useItemOrderStore } from "../../ItemOrderStore";

export function ItemTableRow({ row }: { row: Item }) {
  const { addItemOrder } = useItemOrderStore();

  const handleAdd = () => {
    addItemOrder({
      id: row.itemCode,
      itemNo: row.itemNo,
      itemName: row.itemName,
      supplyUnit: row.supplyUnit,
      quantity: 1, // 기본 1개 추가
      price: row.itemPrice,
      convertStock: row.convertStock
    });
  };

  return (
    <>
      {/* 첫 행 */}
      <TableRow>
        <TableCell>{row.itemCode}</TableCell>
        <TableCell>{row.itemName}</TableCell>
        <TableCell>{row.itemCategory}</TableCell>
        <TableCell>{row.storeLimit == null ? (row.managerLimit == null ? "-" : row.managerLimit) : row.storeLimit}</TableCell>
        <TableCell>{row.itemQuantity == null ? "0" : row.itemQuantity} {row.stockUnit}</TableCell>
        <TableCell>{row.supplyUnit}({row.convertStock} {row.stockUnit})</TableCell>
        <TableCell>{(row.itemPrice).toLocaleString()}</TableCell>
        <TableCell><Button className="yellow-btn" onClick={handleAdd}>담기</Button></TableCell>
      </TableRow>
    </>
  );
}
