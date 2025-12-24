import Button from "../../../shared/components/Button";

interface MenuRecipeSectionProps {
  sizeYn: "Y" | "N";
  onOpenIngredientModal: () => void;
}

export function MenuRecipeSection({sizeYn, onOpenIngredientModal}: MenuRecipeSectionProps) {
    return (
        <section className="mb-10 border rounded px-3 py-2">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-bold">레시피(재료) 정보</h5>
            <Button className="yellow-btn" onClick={onOpenIngredientModal}>
              + 재료 불러오기
            </Button>
          </div>

          <table className="w-full border text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">품목코드</th>
                <th className="border p-2">재료명</th>
                <th className="border p-2">단위</th>
                {sizeYn === "Y" ? (
                  <>
                    <th className="border p-2">라지 정량</th>
                    <th className="border p-2">미디움 정량</th>
                  </>
                ) : (
                  <th className="border p-2">정량</th>
                )}
                <th className="border p-2">삭제</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </section>
    )
}