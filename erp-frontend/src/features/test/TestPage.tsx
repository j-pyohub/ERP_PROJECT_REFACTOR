import { useState } from "react";
import ModalLayout from "../../shared/components/modal/ModalLayout";

export default function TestPage() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = ()=>setIsOpen(false);
    
    return (
        <div>
            <button onClick={()=>setIsOpen(true)}>모달 열기</button>
            {isOpen &&
                // title: 제목, footer: 버튼, onClose: 이벤트, children: 본문
                <ModalLayout title="경고" footer={<button onClick={handleClose}>확인</button>} onClose={handleClose}>
                    <div>내용이 들어가는 곳 입니다.</div>
                </ModalLayout>}
        </div>
    );
}