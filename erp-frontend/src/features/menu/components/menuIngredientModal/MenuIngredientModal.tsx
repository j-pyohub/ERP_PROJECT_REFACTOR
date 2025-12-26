import { useEffect, useState } from "react";
import Button from "../../../../shared/components/Button";
import ModalLayout from "../../../../shared/components/modal/ModalLayout";
import { useAxios } from "../../../../shared/hooks/useAxios";
import type { Item } from "../../../../shared/types/Item";
import { MenuIngredientFilterBar } from "./MenuIngredientFilterBar";
import { MenuIngredientTableView } from "./MenuIngredientTableView";

interface MenuIngredientModalProps {
  onClose: () => void;
  onConfirm?: (items: Item[]) => void;
  selectedItemNos: number[];
  onCheck: (itemNo: number, checked: boolean) => void;
}

export function MenuIngredientModal({
  onClose,
  onConfirm,
}: MenuIngredientModalProps) {
  const [itemCategory, setItemCategory] = useState("");
  const [searchCondition, setSearchCondition] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedItemNos, setSelectedItemNos] = useState<number[]>([]);

  const { data = [], loading, error, request } = useAxios<Item[]>();

  useEffect(() => {
    request({
      url: "/menu/itemList",
      method: "GET",
    });
  }, [request]);

  const onSearch = () => {
    request({
      url: "/menu/itemList",
      method: "GET",
      params: {
        itemCategory: itemCategory || undefined,
        itemCode:
          searchCondition === "itemCode" && keyword ? keyword : undefined,
        ingredientName:
          searchCondition === "ingredientName" && keyword ? keyword : undefined,
      },
    });
  };
  const checkItem = (itemNo: number) => {
    setSelectedItemNos((prev) =>
      prev.includes(itemNo)
        ? prev.filter((no) => no !== itemNo)
        : [...prev, itemNo]
    );
  };

  const checkAll = () => {
    if (selectedItemNos.length === data.length) {
      setSelectedItemNos([]);
    } else {
      setSelectedItemNos(data.map((item) => item.itemNo));
    }
  };

  const handleConfirm = () => {
    const selectedItems = data.filter((item) =>
      selectedItemNos.includes(item.itemNo)
    );

    onConfirm?.(selectedItems);
    onClose();
  };

  return (
    <ModalLayout
      title="재료 불러오기"
      onClose={onClose}
      footer={
        <>
          <Button className="yellow-btn" onClick={handleConfirm}>
            선택 재료 등록
          </Button>
          <Button className="white-btn" onClick={onClose}>
            취소
          </Button>
        </>
      }
    >
      <MenuIngredientFilterBar
        itemCategory={itemCategory}
        searchCondition={searchCondition}
        keyword={keyword}
        onChangeCategory={setItemCategory}
        onChangeCondition={setSearchCondition}
        onChangeKeyword={setKeyword}
        onSearch={onSearch}
      />

      <MenuIngredientTableView
        items={data}
        loading={loading}
        error={error}
        selectedItemNos={selectedItemNos}
        onCheckItem={checkItem}
        onCheckAll={checkAll}
      />
    </ModalLayout>
  );
}
