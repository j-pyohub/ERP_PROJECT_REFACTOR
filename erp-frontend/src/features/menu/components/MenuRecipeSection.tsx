import Button from "../../../shared/components/Button";
import { Table, TableHeader } from "../../../shared/components/Table";
import { useMenuIngredientStore } from "../stores/menuIngredientStore";

interface MenuRecipeSectionProps {
  sizeYn: "Y" | "N";
  onOpenIngredientModal: () => void;
}

export function MenuRecipeSection({sizeYn, onOpenIngredientModal}: MenuRecipeSectionProps) {
    const { selectedItems, removeItem } = useMenuIngredientStore();
    return (
        <section className="mb-10 border rounded px-3 py-2">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-bold">레시피(재료) 정보</h5>
            <Button className="yellow-btn" onClick={onOpenIngredientModal}>
              + 재료 불러오기
            </Button>
          </div>

          <Table
        gridColumns={
          sizeYn === "Y"
            ? "repeat(6, 1fr)"
            : "repeat(5, 1fr)"
        }
        className="w-full border text-center"
      >
        <TableHeader
          columns={[
            "품목코드",
            "재료명",
            "단위",
            ...(sizeYn === "Y"
              ? ["라지 정량", "미디움 정량"]
              : ["정량"]),
            "삭제",
          ]}
        />

        {selectedItems.map((item) => (
          <MenuRecipeRow
            key={item.itemNo}
            item={item}
            sizeYn={sizeYn}
            onRemove={() => removeItem(item.itemNo)}
          />
        ))}
      </Table>
        </section>
    )
}