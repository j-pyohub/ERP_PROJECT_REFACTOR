import { useState } from "react";
import { MenuIngredientModal } from "../components/menuIngredientModal/MenuIngredientModal";
import Button from "../../../shared/components/Button";
import { MenuBasicInfoSection } from "../components/MenuBasicInfoSection";
import { MenuRecipeSection } from "../components/MenuRecipeSection";
import type { MenuAddRequest } from "../types/MenuAddRequest";
import { useAxios } from "../../../shared/hooks/useAxios";
import { useMenuAddStore } from "../stores/menuAddStore";
import { useMenuIngredientStore } from "../stores/menuIngredientStore";

export default function MenuAddPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { request, loading } = useAxios<any>();
  const { checkedItems } = useMenuIngredientStore();
  const { menuCategory, menuCode, menuName, menuExplain, size, releaseStatus, menuPrice, menuPriceLarge, menuPriceMedium, menuImageFile } = useMenuAddStore();
  
  const handleSubmit = async () => {
    try{
      console.log("1. submit 진입");
      console.log("2. loading 상태:", loading);

      const menuDTO: MenuAddRequest = {
      menuCategory, menuCode, menuName, menuExplain, size, hasSize: size === "Y",
      releaseStatus, menuPrice, menuPriceLarge, menuPriceMedium,
      ingredients: checkedItems.map(item => ({
        itemNo: item.itemNo,
        quantity: item.quantity,
        quantityLarge: item.quantityLarge,
        quantityMedium: item.quantityMedium,
      })),

      };
      console.log(menuDTO);
      
      const formData = new FormData();

      formData.append(
        "menuDTO",
        new Blob([JSON.stringify(menuDTO)], {
          type: "application/json",
        })
      );

      if (menuImageFile) {
      formData.append("menuImage", menuImageFile);
      }
      await request({
        url: "/menu/addMenu",
        method: "POST",
        data: formData
      });
      console.log("3. 요청 완료");
    }catch(error){
        console.error("메뉴 등록 중 오류 발생:", error);
    };
  };
 
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold mr-4">메뉴 등록</h2>
        <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
          목록
        </button>
      </div>

      <MenuBasicInfoSection />

      <MenuRecipeSection onOpenIngredientModal={() => setIsOpen(true)} />

      <div className="flex justify-center gap-4">
        <Button className="yellow-btn" onClick={handleSubmit}>등록</Button>
        <Button className="white-btn">초기화</Button>
      </div>

      {isOpen && (
        <MenuIngredientModal onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
