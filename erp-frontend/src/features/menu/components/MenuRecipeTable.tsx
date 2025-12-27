import { Table, TableCell, TableHeader, TableRow } 
  from "../../../shared/components/Table";
import type { MenuIngredient } 
  from "../../../shared/types/MenuIngredient";

interface MenuRecipeTableProps {
  sizeYn: "Y" | "N";
  recipeItems: MenuIngredient[];
  onChangeQuantity: (
    itemNo: number,
    field: "quantity" | "quantityLarge" | "quantityMedium",
    value: number | undefined
  ) => void;
  onRemoveItem: (itemNo: number) => void;
}

export function MenuRecipeTable({
  sizeYn,
  recipeItems = [],
  onChangeQuantity,
  onRemoveItem
}: MenuRecipeTableProps) {
  const columns = [
    "품목 코드",
    "재료 명",
    "단위",
    ...(sizeYn === "Y"
      ? ["라지 정량", "미디움 정량"]
      : ["정량"]),
    "삭제",
  ];


  return (
    <Table
      gridColumns={`repeat(${columns.length}, 1fr)`}
      className="w-full"
    >
      <TableHeader columns={columns} />

      {recipeItems.length === 0 ? (
        <TableRow>
          <TableCell hideBottomBorder>
            선택된 재료가 없습니다.
          </TableCell>
        </TableRow>
      ) : (
        recipeItems.map((item) => (
          <TableRow key={item.itemNo}>
            <TableCell>{item.itemCode}</TableCell>

            <TableCell>{item.ingredientName}</TableCell>
            <TableCell>{item.stockUnit}</TableCell>

            {sizeYn === "Y" ? (
              <>
                <TableCell>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-full border text-right"
                    value={item.quantityLarge ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (/^\d*$/.test(raw)) {
                        onChangeQuantity(
                          item.itemNo,
                          "quantityLarge",
                          raw === "" ? undefined : Number(raw)
                        );
                      }
                    }}
                  />
                </TableCell>

                <TableCell>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-full border text-right"
                    value={item.quantityMedium ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (/^\d*$/.test(raw)) {
                        onChangeQuantity(
                          item.itemNo,
                          "quantityMedium",
                          raw === "" ? undefined : Number(raw)
                        );
                      }
                    }}
                  />
                </TableCell>
              </>
            ) : (
              <TableCell>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-full border text-right"
                    value={item.quantity ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (/^\d*$/.test(raw)) {
                        onChangeQuantity(
                          item.itemNo,
                          "quantity",
                          raw === "" ? undefined : Number(raw)
                        );
                      }
                    }}
                  />
              </TableCell>
            )}

            <TableCell>
              <button
                className="text-red-500"
                onClick={() => onRemoveItem(item.itemNo)}
              >
                삭제
              </button>
            </TableCell>
          </TableRow>
        ))
      )}
    </Table>
  );
}
