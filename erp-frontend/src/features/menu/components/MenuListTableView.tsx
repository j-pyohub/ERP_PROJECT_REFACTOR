import type { Menu } from "../types/Menu";

interface MenuListTableViewProps {
    menus: Menu[]
    clickHandling?: (menuNo: number) => void
}

function MenuListTableView() {
    return (
        <div className="tab-content-area tab-active list scroll-area">
            <table className="table text-center align-middle bg-white rounded shadow-sm table-fixed-header">
                <thead className="table-light">
                <tr>
                    <th>카테고리</th>
                    <th>메뉴 코드</th>
                    <th>메뉴 명</th>
                    <th>사이즈</th>
                    <th>가격</th>
                    <th>출시 상태</th>
                    <th>상세</th>
                </tr>
                </thead>
                <tbody id="menuListBody">
                </tbody>
            </table>
        </div>
    )
};
export default MenuListTableView;