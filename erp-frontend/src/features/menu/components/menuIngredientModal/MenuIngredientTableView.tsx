import { Table, TableHeader } from "../../../../shared/components/Table";
import type { Item } from "../../../../shared/types/Item";
import { MenuIngredientTableRow } from "./MenuIngredientTableRow";
import { useMenuIngredientStore } from "../../stores/menuIngredientStore";

interface MenuIngredientTableViewProps {
  items: Item[];
  loading: boolean;
  error: Error | null;
}

export function MenuIngredientTableView({
  items,
  loading,
  error,
}: MenuIngredientTableViewProps) {
  const { tempItems, checkTempItem, checkTempAll } = useMenuIngredientStore();
 const tempItemNos = tempItems.map(i => i.itemNo);

  const isAllChecked =
    items.length > 0 && tempItemNos.length === items.length;
  const columns = [
    <input
      type="checkbox"
      checked={isAllChecked}
      onChange={() => checkTempAll(items)}
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
            checked={tempItemNos.includes(item.itemNo)}
            onCheck={() => checkTempItem(item)}
          />
        ))}
      </Table>
    </div>
  );
}
