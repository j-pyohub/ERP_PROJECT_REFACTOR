import type {ItemOrderProposal} from "../../types/ItemOrderProposal";
import { ItemOrderProposalTableRow } from "./ItemOrderProposalTableRow";
import type { Item } from "../../types/Item";

export function ItemOrderProposalTableBody({ items, itemList, onRemove }: { items: ItemOrderProposal[], itemList: Item[], onRemove: (itemNo: number) => void }) {
  return (
    <>
        {items?.map(item => (
                <ItemOrderProposalTableRow key={item.itemNo} row={item} itemList={itemList} onRemove={onRemove} />
            ))
        }
    </>
  );
}
