import { Table, TableHeader } from "../../../../shared/components/Table";
import { ItemOrderSelectedTableBody } from "./ItemOrderSelectedTableBody";
import { useItemOrderStore } from "../../ItemOrderStore";

export default function ItemOrderSelectedTableView() {
    const { itemOrders } = useItemOrderStore();
    const columns = ["품목명", "공급단위", "수량", "금액", "삭제"];

    return (
        <div className="tab-content-area tab-active list scroll-area">
            <Table gridColumns="repeat(5, 1fr)" className="text-center">
                <TableHeader columns={columns} />
                <ItemOrderSelectedTableBody items={itemOrders} />
            </Table>
        </div>
    );
}