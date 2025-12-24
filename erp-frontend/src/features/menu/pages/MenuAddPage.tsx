import { useState } from "react";
import { MenuIngredientModal } from "../components/menuIngredientModal/MenuIngredientModal";
import Button from "../../../shared/components/Button";
import { MenuBasicInfoSection } from "../components/MenuBasicInfoSection";
import { MenuRecipeSection } from "../components/MenuRecipeSection";

export default function MenuCreate() {
  const [sizeYn, setSizeYn] = useState<"Y" | "N">("Y");
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
      <>
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold mr-4">메뉴 등록</h2>
          <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
            목록
          </button>
        </div>

        <MenuBasicInfoSection sizeYn={sizeYn} onChangeSizeYn={setSizeYn}/>
        <MenuRecipeSection sizeYn={sizeYn} onOpenIngredientModal={() => setIsOpen(true)}/>

        <div className="flex justify-center gap-4">
          <Button className="yellow-btn">
            등록
          </Button>
          <Button className="white-btn">
            초기화
          </Button>

      {isOpen && <MenuIngredientModal onClose={handleClose} />}
        </div>
    </>

  );
}
