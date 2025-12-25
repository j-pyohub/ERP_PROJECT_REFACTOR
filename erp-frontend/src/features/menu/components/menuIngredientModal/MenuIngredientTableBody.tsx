import type { Item } from "../../../../shared/types/Item";
import { MenuIngredientTableRow } from "./MenuIngredientTableRow";


interface MenuIngredientTableBodyProps {
  items: Item[];
  selectedItemNos: number[];
  onCheck: (itemNo: number) => void;
}

export function MenuIngredientTableBody({
  items,
  selectedItemNos,
  onCheck,
}: MenuIngredientTableBodyProps) {
  return (
    <>
      {items.map(item => (
        <MenuIngredientTableRow
          key={item.itemNo}
          item={item}
          checked={selectedItemNos.includes(item.itemNo)}
          onCheck={onCheck}
        />
      ))}
    </>
  );
}
