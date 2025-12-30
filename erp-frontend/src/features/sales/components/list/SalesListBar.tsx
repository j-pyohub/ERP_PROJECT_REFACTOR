import DateInput from "../../../../shared/components/DateInput";
import { LabeledInput } from "../../../../shared/components/LabeledInput";
import Button from "../../../../shared/components/Button";

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
            <DateInput
                from={from}
                to={to}
                onChangeFrom={onChangeFrom}
                onChangeTo={onChangeTo}
            />

            <div className="flex items-center gap-2">


                <LabeledInput
                    id="sales-list-store"
                    type="text"
                    label="직영점명"
                    value={storeName}
                    onChange={(e) => onChangeStoreName(e.target.value)}
                    placeholder="지점명 검색"
                    inputClassName="h-9 w-40"
                    labelClassName="font-semibold block"
                    wrapperClassName="flex items-center gap-1"
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
