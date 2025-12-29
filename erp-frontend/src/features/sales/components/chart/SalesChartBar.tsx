import { LabeledInput } from "../../../../shared/components/LabeledInput";
import type { SalesFilterState } from "../../types/SalesFilter.ts";

const INPUT_TYPE_MAP = {
    day: "date",
    week: "week",
    month: "month",
    year: "number",
} as const;

type Props = {
    filter: SalesFilterState;
    onChange: (next: SalesFilterState) => void;

    storeName: string;
    onOpenStoreModal: () => void;

    onSearch: () => void;
    onReset: () => void;
};

export default function SalesChartBar({
                                          filter,
                                          onChange,
                                          storeName,
                                          onOpenStoreModal,
                                          onSearch,
                                          onReset,
                                      }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4 text-sm">
                {[
                    ["day", "일별"],
                    ["week", "주별"],
                    ["month", "월별"],
                    ["year", "연별"],
                ].map(([value, label]) => (
                    <label key={value} className="flex items-center gap-1 h-9">
                        <input
                            type="radio"
                            checked={filter.periodType === value}
                            onChange={() =>
                                onChange({
                                    ...filter,
                                    periodType: value as SalesFilterState["periodType"],
                                    from: "",
                                    to: "",
                                })
                            }
                        />
                        {label}
                    </label>
                ))}
            </div>


            <div className="flex items-center gap-2 text-sm">

                <LabeledInput
                    id="sales-from"
                    type={INPUT_TYPE_MAP[filter.periodType]}
                    label=""
                    value={filter.from}
                    onChange={(e) =>
                        onChange({
                            ...filter,
                            from: e.target.value,
                        })
                    }
                    inputClassName="h-9 w-36"
                />

                <span>~</span>

                <LabeledInput
                    id="sales-to"
                    type={INPUT_TYPE_MAP[filter.periodType]}
                    label=""
                    value={filter.to}
                    onChange={(e) =>
                        onChange({
                            ...filter,
                            to: e.target.value,
                        })
                    }
                    inputClassName="h-9 w-36"
                />
            </div>

            <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">직영점</span>
                <input
                    readOnly
                    value={storeName || "전체 직영점"}
                    onClick={onOpenStoreModal}
                    className="border rounded px-2 py-1 h-9 w-44 bg-gray-50 cursor-pointer"
                />
            </div>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="yellow-btn h-9 px-4 text-sm"
                    onClick={onSearch}
                >
                    조회
                </button>

                <button
                    type="button"
                    className="white-btn h-9 px-4 text-sm"
                    onClick={onReset}
                >
                    초기화
                </button>
            </div>
        </div>
    );
}
