import Button from "../../../shared/components/Button";
import { useMenuIngredientStore } from "../stores/menuIngredientStore";
import { MenuRecipeTable } from "./MenuRecipeTable";

interface MenuRecipeSectionProps {
  onOpenIngredientModal: () => void;
}

export function MenuRecipeSection({onOpenIngredientModal}: MenuRecipeSectionProps) {
  const { checkedItems, updateRecipeQuantity, removeRecipeItem } = useMenuIngredientStore();

  return (
        <section className="mb-10 border rounded px-3 py-2">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-bold">레시피(재료) 정보</h5>
            <Button className="yellow-btn" onClick={onOpenIngredientModal}>
              + 재료 불러오기
            </Button>
          </div>
          <MenuRecipeTable
            recipeItems={checkedItems}
            onChangeQuantity={updateRecipeQuantity}
            onRemoveItem={removeRecipeItem}
          />
        </section>
    )
}