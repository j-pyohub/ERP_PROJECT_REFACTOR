import { useEffect } from "react";
import { Table, TableHeader} from "../../../shared/components/Table";
import { useAxios } from "../../../shared/hooks/userAxios";
import type { Menu } from "../types/Menu";
import { MenuGroupTable } from "./MenuGroupTable";

function MenuListTableView() {
    const columns = [
        "카테고리", "메뉴 코드", "메뉴 명", "사이즈", "가격", "출시 상태", "상세"
    ];
    const {data, loading, error, request } = useAxios<Menu[]>();
    useEffect(() => {
        request({ url: '/menu/menuList', method: 'GET' });
    }, [request]);

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error.message}</div>;
    if (!data) return null;

    return (
        <div className="tab-content-area tab-active list scroll-area">
      <Table gridColumns="repeat(7, 1fr)" className="text-center">
        <TableHeader columns={columns} />
        <MenuGroupTable menus={data} />
      </Table>
    </div>
    )
};
export default MenuListTableView;