import { Table, TableHeader } from "../../../../shared/components/Table";
import type { Item } from "../../../../shared/types/Item";
import { MenuIngredientTableRow } from "./MenuIngredientTableRow";

interface MenuIngredientTableViewProps {
  items: Item[];
  loading: boolean;
  error: Error | null;
  selectedItemNos: number[];
  onCheckItem: (itemNo: number) => void;
  onCheckAll: () => void;
}

export function MenuIngredientTableView({
  items,
  loading,
  error,
  selectedItemNos,
  onCheckItem,
  onCheckAll,
}: MenuIngredientTableViewProps) {
  const isAllSelected =
    items.length > 0 && selectedItemNos.length === items.length;

  const columns = [
    <input
      type="checkbox"
      checked={isAllSelected}
      onChange={onCheckAll}
    />,
    "품목 코드",
    "재료 명",
    "카테고리",
    "기준 단위",
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-h-[300px] overflow-y-auto">
      <Table gridColumns="40px repeat(4, 1fr)" className="text-center">
        <TableHeader columns={columns} sticky />

        {items.map((item) => (
          <MenuIngredientTableRow
            key={item.itemNo}
            item={item}
            checked={selectedItemNos.includes(item.itemNo)}
            onCheck={onCheckItem}
          />
        ))}
      </Table>
    </div>
  );
}
