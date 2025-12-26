import Button from "../../../shared/components/Button";
import type { MenuIngredient } from "../../../shared/types/MenuIngredient";
import { MenuRecipeTable } from "./MenuRecipeTable";

interface MenuRecipeSectionProps {
  sizeYn: "Y" | "N";
  recipeItems: MenuIngredient[];
  onOpenIngredientModal: () => void;
  onChangeQuantity: (
    itemNo: number,
    field: "quantity" | "quantityLarge" | "quantityMedium",
    value: number
  ) => void;
  onRemoveItem: (itemNo: number) => void;
}

export function MenuRecipeSection({sizeYn, recipeItems, onOpenIngredientModal, onChangeQuantity, onRemoveItem}: MenuRecipeSectionProps) {
  
  return (
        <section className="mb-10 border rounded px-3 py-2">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-bold">레시피(재료) 정보</h5>
            <Button className="yellow-btn" onClick={onOpenIngredientModal}>
              + 재료 불러오기
            </Button>
          </div>
          <MenuRecipeTable
            sizeYn={sizeYn}
            recipeItems={recipeItems}
            onChangeQuantity={onChangeQuantity}
            onRemoveItem={onRemoveItem}
          />
        </section>
    )
}