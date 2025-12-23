import { useState } from "react";
import Button from "../../../../shared/components/Button";
import ModalLayout from "../../../../shared/components/modal/ModalLayout";
import { MenuIngredientTableView } from "./MenuIngredientTableView";
import { MenuIngredientFilterBar } from "./MenuIngredientFilterBar";

interface MenuIngredientModalProps {
  onClose: () => void;
}

export function MenuIngredientModal ({
  onClose,
}: MenuIngredientModalProps){
    const [itemCategory, setItemCategory] = useState("");
    const [searchCondition, setSearchCondition] = useState("");
    

    return (
        <ModalLayout
            title="재료 불러오기"
            footer={
            <>
                <Button className="yellow-btn" onClick={onClose}>
                    선택 재료 등록
                </Button>
                <Button className="white-btn" onClick={onClose}>
                    취소
                </Button>
            </>
            }
            onClose={onClose}
            >
            <MenuIngredientFilterBar 
                    itemCategory={itemCategory}
                    searchCondition={searchCondition}
                    onChangeCategory={setItemCategory}
                    onChangeCondition={setSearchCondition} />
            <MenuIngredientTableView itemCategory={itemCategory} searchCondition={searchCondition} />
        </ModalLayout>
    )
}