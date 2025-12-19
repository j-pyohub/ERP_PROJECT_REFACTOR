import { Table, TableHeader, TableBody} from "../../../shared/components/Table";
import type { Menu } from "../types/Menu";

function MenuListTableView() {
    const columns = [
        "카테고리", "메뉴 코드", "메뉴 명", "사이즈", "가격", "출시 상태", "상세"
    ];

    return (
        <div className="tab-content-area tab-active list scroll-area">
           <Table className="text-center table-fixed-header">
                <TableHeader columns={columns}/>
                <TableBody id="menuListBody"/>
           </Table>
        </div>
    )
};
export default MenuListTableView;