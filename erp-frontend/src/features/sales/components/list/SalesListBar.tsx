import { LabeledInput } from "../../../../shared/components/LabeledInput.tsx";
import Button from "../../../../shared/components/Button.tsx";

type Props = {
    from: string;
    to: string;
    storeName: string;
    onChangeFrom: (v: string) => void;
    onChangeTo: (v: string) => void;
    onChangeStoreName: (v: string) => void;
    onSearch: () => void;
    onReset: () => void;
};

export default function SalesListBar({
                                         from,
                                         to,
                                         storeName,
                                         onChangeFrom,
                                         onChangeTo,
                                         onChangeStoreName,
                                         onSearch,
                                         onReset,
                                     }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-6 text-sm">
            {/* 조회기간 */}
            <div className="flex items-center gap-2">
                <span className="font-medium">조회기간</span>

                <LabeledInput
                    id="sales-list-from"
                    type="date"
                    label=""
                    value={from}
                    onChange={(e) => onChangeFrom(e.target.value)}
                    inputClassName="h-9 w-36"
                />

                <span>~</span>

                <LabeledInput
                    id="sales-list-to"
                    type="date"
                    label=""
                    value={to}
                    onChange={(e) => onChangeTo(e.target.value)}
                    inputClassName="h-9 w-36"
                />
            </div>

            <div className="flex items-center gap-2">
                <span className="font-medium">직영점명</span>

                <LabeledInput
                    id="sales-list-store"
                    type="text"
                    label=""
                    value={storeName}
                    onChange={(e) => onChangeStoreName(e.target.value)}
                    placeholder="지점명 검색"
                    inputClassName="h-9 w-40"
                />

                <Button className="yellow-btn h-9 px-4" onClick={onSearch}>
                    검색
                </Button>

                <Button className="white-btn h-9 px-4" onClick={onReset}>
                    초기화
                </Button>


            </div>
        </div>
    );
}
