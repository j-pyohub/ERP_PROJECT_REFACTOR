import ModalLayout from "../../../../../shared/components/modal/ModalLayout";
import Button from "../../../../../shared/components/Button";
import MenuSearchTable, { type StoreMenuItem } from "./MenuSearchTable";


type Props = {
    open: boolean;
    items: StoreMenuItem[];
    checked: Set<number>;
    disabledSet: Set<number>;
    onClose: () => void;
    onToggleAll: (checked: boolean) => void;
    onToggleOne: (storeMenuNo: number, checked: boolean) => void;
    onConfirm: () => void;
};

export default function MenuSearchModal({
                                            open,
                                            items,
                                            checked,
                                            disabledSet,
                                            onClose,
                                            onToggleAll,
                                            onToggleOne,
                                            onConfirm,
                                        }: Props) {
    if (!open) return null;

    return (
        <ModalLayout
            title="메뉴 선택"
            onClose={onClose}
            footer={
                <Button className="yellow-btn" onClick={onConfirm}>
                    선택 완료
                </Button>
            }
        >
            <MenuSearchTable
                items={items}
                checked={checked}
                disabledSet={disabledSet}
                onToggleAll={onToggleAll}
                onToggleOne={onToggleOne}
            />
        </ModalLayout>
    );
}