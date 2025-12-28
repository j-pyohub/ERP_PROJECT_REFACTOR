import { useEffect, useState } from "react";
import { Table, TableHeader} from "../../../../shared/components/Table";
import { useAxios } from "../../../../shared/hooks/useAxios";
import type {ItemOrderProposal} from "../../types/ItemOrderProposal";
import {ItemOrderProposalTableBody} from "./ItemOrderProposalTableBody";
import type { Item } from "../../types/Item";


function ItemOrderProposalTableView({ itemList }: { itemList: Item[] }) {
    const columns = [
        "제안일자", "품목명", "수량", "사유", "관리"
    ];
    const {data, loading, error, request } = useAxios<ItemOrderProposal[]>();
    const [proposals, setProposals] = useState<ItemOrderProposal[]>([]);
                               
    useEffect(() => {
        request({
            url: `/itemOrder/itemProposal`,
            method: "GET",
        });
    }, []);

    useEffect(() => {
        if (data) {
            setProposals(data);
        }
    }, [data]);

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error.message}</div>;
    if (!proposals) return null;

    const handleRemoveProposal = (itemNo: number) => {
        setProposals(currentProposals => currentProposals.filter(p => p.itemNo !== itemNo));
    };

    return (
        <div className="tab-content-area tab-active list scroll-area">
        <Table gridColumns="repeat(5, 1fr)" className="text-center">
            <TableHeader columns={columns} />
            <ItemOrderProposalTableBody items={proposals} itemList={itemList} onRemove={handleRemoveProposal} />
        </Table>
    </div>
    )
};
export default ItemOrderProposalTableView;