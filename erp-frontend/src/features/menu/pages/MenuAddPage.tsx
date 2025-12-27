import { useState } from "react";
import { MenuIngredientModal } from "../components/menuIngredientModal/MenuIngredientModal";
import Button from "../../../shared/components/Button";
import { MenuBasicInfoSection } from "../components/MenuBasicInfoSection";
import { MenuRecipeSection } from "../components/MenuRecipeSection";
import type { Item } from "../../../shared/types/Item";
import type { MenuIngredient } from "../../../shared/types/MenuIngredient";

export default function MenuCreate() {
  const [sizeYn, setSizeYn] = useState<"Y" | "N">("Y");
  const [isOpen, setIsOpen] = useState(false);

  const [menuIngredients, setMenuIngredients] = useState<MenuIngredient[]>([]);

  const handleConfirmItems = (items: Item[]) => {
    setMenuIngredients((prev) => {
      const existItemNos = prev.map((i) => i.itemNo);

      const newIngredients: MenuIngredient[] = items
        .filter((item) => !existItemNos.includes(item.itemNo))
        .map((item) => ({
          itemNo: item.itemNo,
          ingredientName: item.ingredientName,
          stockUnit: item.stockUnit,
          itemCode: item.itemCode,  
          quantity: undefined,
          quantityLarge: undefined,
          quantityMedium: undefined,
        }));

      return [...prev, ...newIngredients];
    });
  };

  const handleChangeQuantity = (
    itemNo: number,
    field: "quantity" | "quantityLarge" | "quantityMedium",
    value: number
  ) => {
    setMenuIngredients((prev) =>
      prev.map((item) =>
        item.itemNo === itemNo
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleRemoveItem = (itemNo: number) => {
    setMenuIngredients((prev) =>
      prev.filter((item) => item.itemNo !== itemNo)
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold mr-4">메뉴 등록</h2>
        <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
          목록
        </button>
      </div>

      <MenuBasicInfoSection
        sizeYn={sizeYn}
        onChangeSizeYn={setSizeYn}
      />

      <MenuRecipeSection
        sizeYn={sizeYn}
        recipeItems={menuIngredients}
        onOpenIngredientModal={() => setIsOpen(true)}
        onChangeQuantity={handleChangeQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <div className="flex justify-center gap-4">
        <Button className="yellow-btn">등록</Button>
        <Button className="white-btn">초기화</Button>
      </div>

      {isOpen && (
        <MenuIngredientModal
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirmItems}
          selectedItemNos={menuIngredients.map((i) => i.itemNo)}
        />
      )}
    </>
  );
}
