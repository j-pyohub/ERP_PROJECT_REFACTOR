import { Table, TableHeader } from "../../../../shared/components/Table";
import { MenuIngredientTableBody } from "./MenuIngredientTableBody";

interface MenuIngredientTableViewProps {
    itemCategory: string;
    searchCondition: string;
}

export function MenuIngredientTableView({ itemCategory, searchCondition }: MenuIngredientTableViewProps){
    const columns = ["품목 코드", "재료 명", "카테고리", "기준 단위"];
    
    return (
        <div className="max-h-[600px] overflow-y-auto">
  <Table gridColumns="repeat(7, 1fr)" className="text-center">
    <TableHeader
      columns={columns}
      className="top-0 bg-gray-100 z-10"
      sticky
    />
    <MenuIngredientTableBody />
  </Table>
</div>
    )
}