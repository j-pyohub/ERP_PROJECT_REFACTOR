import Button from "../../../../shared/components/Button";
import { TableRow, TableCell } from "../../../../shared/components/Table";
import type { ItemOrderProposal } from "../../types/ItemOrderProposal";
import { useItemOrderStore } from "../../ItemOrderStore";
import type { Item } from "../../types/Item";
import { useAxios } from "../../../../shared/hooks/useAxios";
import { useEffect } from "react";

export function ItemOrderProposalTableRow({ row, itemList, onRemove }: { row: ItemOrderProposal, itemList: Item[], onRemove: (itemNo: number) => void }) {
  const date = new Date(row.proposalDate);
  const { addItemOrder } = useItemOrderStore();
  const { data: confirmData, loading: confirmLoading, error: confirmError, request: confirmRequest } = useAxios();

  const handleAdd = () => {
    // 서버로 제안 확인 요청을 보냅니다.
    // 참고: itemOrder.html에 명시된 엔드포인트가 있다면 그에 맞게 수정해주세요.
    confirmRequest({
      url: `/itemOrder/respondItemProposal/${row.proposalNo}`,
      method: 'PUT',
    });
  };

  useEffect(() => {
    if (confirmData) {
      const foundItem = itemList.find(item => item.itemNo === row.itemNo);

      // Right-section(발주 목록)에 아이템 추가
      addItemOrder({
        id: row.itemNo,
        itemNo: row.itemNo,
        itemName: row.itemName,
        supplyUnit: foundItem ? foundItem.supplyUnit : "EA",
        quantity: row.quantity,
        price: foundItem ? foundItem.itemPrice : 0,
        convertStock: foundItem ? foundItem.convertStock : 0
      });
      // Left-section(제안 목록)에서 아이템 제거
      onRemove(row.itemNo);
      alert("품목을 발주 목록에 추가했습니다.");
    }
    if (confirmError) {
      console.error("제안 확인 오류:", confirmError);
      alert("제안 품목을 추가하는 데 실패했습니다.");
    }
  }, [confirmData, confirmError]);

  return (
    <>
      {/* 첫 행 */}
      <TableRow>
        <TableCell>{date.toLocaleDateString('ko-KR')}</TableCell>
        <TableCell>{row.itemName}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.reason}</TableCell>
        <TableCell><Button className="yellow-btn" onClick={handleAdd} disabled={confirmLoading}>
          {confirmLoading ? "처리중..." : "담기"}
        </Button></TableCell>
      </TableRow>
    </>
  );
}
