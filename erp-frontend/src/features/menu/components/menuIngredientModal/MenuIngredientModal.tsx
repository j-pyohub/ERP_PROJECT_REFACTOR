import { useEffect, useState } from "react";
import Button from "../../../../shared/components/Button";
import ModalLayout from "../../../../shared/components/modal/ModalLayout";
import { useAxios } from "../../../../shared/hooks/useAxios";
import type { Item } from "../../../../shared/types/Item";
import { MenuIngredientFilterBar } from "./MenuIngredientFilterBar";
import { MenuIngredientTableView } from "./MenuIngredientTableView";
import { useMenuIngredientStore } from "../../stores/menuIngredientStore";

interface MenuIngredientModalProps {
  onClose: () => void;
}

export function MenuIngredientModal({
  onClose,
}: MenuIngredientModalProps) {
  const [itemCategory, setItemCategory] = useState("");
  const [searchCondition, setSearchCondition] = useState("");
  const [keyword, setKeyword] = useState("");
  const {checkTempToRecipe, resetTemp} = useMenuIngredientStore();

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



  return (
    <ModalLayout
      title="재료 불러오기"
      onClose={onClose}
      footer={
        <>
          <Button className="yellow-btn" onClick={() => {
            checkTempToRecipe();
            onClose();
          }}>
            선택 재료 등록
          </Button>
          <Button className="white-btn" onClick={() => {
            resetTemp();
            onClose();
          }}>
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
      />
    </ModalLayout>
  );
}
