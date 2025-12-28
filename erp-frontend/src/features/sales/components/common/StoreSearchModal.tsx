import ModalLayout from "../../../../shared/components/modal/ModalLayout";
import Button from "../../../../shared/components/Button";
import StoreSearchContent from "./StoreSearchContent";

type Props = {
    open: boolean;
    onClose: () => void;
    onSelect: (storeNo: number, storeName: string) => void;
};

export default function StoreSearchModal({
                                             open,
                                             onClose,
                                             onSelect,
                                         }: Props) {
    if (!open) return null;

    return (
        <ModalLayout
            title="직영점 선택"
            onClose={onClose}
            footer={
                <Button className="white-btn" onClick={onClose}>
                    닫기
                </Button>
            }
        >
            <StoreSearchContent
                onSelect={(storeNo, storeName) => {
                    onSelect(storeNo, storeName);
                    onClose();
                }}
            />
        </ModalLayout>
    );
}
