import { LabeledInput } from "./LabeledInput";

type Props = {
    fromId?: string;
    toId?: string;
    from: string;
    to: string;
    onChangeFrom: (v: string) => void;
    onChangeTo: (v: string) => void;
    label?: string;
    inputClassName?: string;
};

export default function DateRangeInput({
                                           fromId = "date-from",
                                           toId = "date-to",
                                           from,
                                           to,
                                           onChangeFrom,
                                           onChangeTo,
                                           label = "조회기간",
                                           inputClassName = "h-9 w-36",
                                       }: Props) {
    return (
        <div className="flex items-center gap-2">
            <span className="font-medium">{label}</span>
            <LabeledInput
                id={fromId}
                type="date"
                label=""
                value={from}
                onChange={(e) => onChangeFrom(e.target.value)}
                inputClassName={inputClassName}
            />
            <span>~</span>
            <LabeledInput
                id={toId}
                type="date"
                label=""
                value={to}
                onChange={(e) => onChangeTo(e.target.value)}
                inputClassName={inputClassName}
            />
        </div>
    );
}
