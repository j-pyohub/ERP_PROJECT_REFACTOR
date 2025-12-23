import { useState } from "react";
import Button from "../../../shared/components/Button";
import ModalLayout from "../../../shared/components/modal/ModalLayout";

interface MenuIngredientModalProps {
  onClose: () => void;
}

export function MenuIngredientModal ({
  onClose,
}: MenuIngredientModalProps){

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
            <div>
                재료 정보 불러오기 테이블
            </div>
        </ModalLayout>
    )
}