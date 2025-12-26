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
    value: number
  ) => void;
  onRemoveItem: (itemNo: number) => void;
}

export function MenuRecipeTable({
  sizeYn,
  recipeItems = [],
  onChangeQuantity,
  onRemoveItem,
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

      {/* ✅ empty state */}
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
                    type="number"
                    className="w-full border text-right"
                    value={item.quantityLarge ?? ""}
                    onChange={(e) =>
                      onChangeQuantity(
                        item.itemNo,
                        "quantityLarge",
                        Number(e.target.value)
                      )
                    }
                  />
                </TableCell>

                <TableCell>
                  <input
                    type="number"
                    className="w-full border text-right"
                    value={item.quantityMedium ?? ""}
                    onChange={(e) =>
                      onChangeQuantity(
                        item.itemNo,
                        "quantityMedium",
                        Number(e.target.value)
                      )
                    }
                  />
                </TableCell>
              </>
            ) : (
              <TableCell>
                <input
                  type="number"
                  className="w-full border text-right"
                  value={item.quantity ?? ""}
                  onChange={(e) =>
                    onChangeQuantity(
                      item.itemNo,
                      "quantity",
                      Number(e.target.value)
                    )
                  }
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
