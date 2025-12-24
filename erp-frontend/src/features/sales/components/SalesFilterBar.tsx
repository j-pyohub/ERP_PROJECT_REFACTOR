import type { SalesPeriodType } from "../types/SalesFilter";

type Props = {
    showPeriodType?: boolean;
    periodType?: SalesPeriodType;
    onChangePeriodType?: (v: SalesPeriodType) => void;

    from?: string;
    to?: string;
    onChangeFrom?: (v: string) => void;
    onChangeTo?: (v: string) => void;

    onSearch: () => void;
};

export default function SalesFilterBar({
                                           showPeriodType = true,
                                           periodType = "day",
                                           onChangePeriodType,
                                           from = "",
                                           to = "",
                                           onChangeFrom,
                                           onChangeTo,
                                           onSearch,
                                       }: Props) {
    const canSearch = Boolean(from && to);

    return (
        <div className="bg-light rounded p-3 d-flex gap-3 align-items-end flex-wrap">
            {showPeriodType && (
                <div>
                    <label className="form-label fw-semibold">조회 단위</label>
                    <select
                        className="form-select form-select-sm"
                        value={periodType}
                        onChange={(e) =>
                            onChangePeriodType?.(e.target.value as SalesPeriodType)
                        }
                    >
                        <option value="day">일별</option>
                        <option value="month">월별</option>
                    </select>
                </div>
            )}

            <div>
                <label className="form-label fw-semibold">기간(From)</label>
                <input
                    type="date"
                    className="form-control form-control-sm"
                    value={from}
                    onChange={(e) => onChangeFrom?.(e.target.value)}
                />
            </div>

            <div>
                <label className="form-label fw-semibold">기간(To)</label>
                <input
                    type="date"
                    className="form-control form-control-sm"
                    value={to}
                    min={from || undefined}
                    onChange={(e) => onChangeTo?.(e.target.value)}
                />
            </div>

            <button
                className="btn btn-sm btn-warning"
                onClick={onSearch}
                disabled={!canSearch}
            >
                조회
            </button>
        </div>
    );
}
