import { useEffect } from "react";
import { Table, TableHeader} from "../../../shared/components/Table";
import { useAxios } from "../../../shared/hooks/useAxios";
import { ItemTableBody } from "./ItemTableBody";
import type { Item } from "../types/Item";

interface ItemTableViewProps {
  itemCategory: string;
  searchType: string;
  currentPage: number;
  keyword: string;
  onTotalContentChange: (totalContent: number) => void;
}

function ItemTableView({ itemCategory, searchType, currentPage, keyword, onTotalContentChange }: ItemTableViewProps) {
    const columns = [
        "카테고리", "품목 코드", "품목 명", "재료명", "공급사", "공급 가격", "상세"
    ];
    const {data, loading, error, request } = useAxios<Item[]>();
                               
    useEffect(() => {
        request({
            url: `/items/list/${currentPage}`,
            method: "GET",
            params: {
                itemCategory,
                [searchType]: keyword
            }
        });
    }, [itemCategory, searchType, request, currentPage, keyword]);

    useEffect(() => {
        if (data) {
            onTotalContentChange(data.page.totalElements);
        }  
    }, [data, onTotalContentChange]);

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error.message}</div>;
    if (!data) return null;


    return (
        <div className="tab-content-area tab-active list scroll-area">
        <Table gridColumns="repeat(7, 1fr)" className="text-center">
            <TableHeader columns={columns} />
            <ItemTableBody items={data.page.content} />
        </Table>
    </div>
    )
};
export default ItemTableView;