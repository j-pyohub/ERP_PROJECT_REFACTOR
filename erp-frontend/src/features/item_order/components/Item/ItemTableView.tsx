import type{ Item } from "../../types/Item";
import { Table, TableHeader} from "../../../../shared/components/Table";
import { ItemTableBody } from "./ItemTableBody";

function ItemTableView({ items }: { items: Item[] }) {
    const columns = [
        "품목 코드", "품목 명", "카테고리", "하한선", "실재고", "공급단위", "공급 가격", "담기"
    ];

    return (
        <div className="tab-content-area tab-active list scroll-area">
        <Table gridColumns="repeat(8, 1fr)" className="text-center">
            <TableHeader columns={columns} />
            <ItemTableBody items={items} />
        </Table>
    </div>
    )
};
export default ItemTableView;