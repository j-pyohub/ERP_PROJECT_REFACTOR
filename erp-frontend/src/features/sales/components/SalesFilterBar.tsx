
type Props = {
    showPeriodType?: boolean; // 조회 단위 표시 여부
    periodType?: "day" | "month";
    onChangePeriodType?: (v: "day" | "month") => void;

    from?: string;
    to?: string;
    onChangeFrom?: (v: string) => void;
    onChangeTo?: (v: string) => void;

    onSearch: () => void;
};

export function SalesFilterBar({
                                   showPeriodType = true,
                                   periodType = "day",
                                   onChangePeriodType,
                                   onSearch,
                               }: Props) {
    return (
        <div className="bg-light rounded p-3 d-flex gap-3 align-items-end">
            {showPeriodType && (
                <div>
                    <label className="form-label fw-semibold">조회 단위</label>
                    <select
                        className="form-select form-select-sm"
                        value={periodType}
                        onChange={(e) =>
                            onChangePeriodType?.(e.target.value as any)
                        }
                    >
                        <option value="day">일별</option>
                        <option value="month">월별</option>
                    </select>
                </div>
            )}

            <div>
                <label className="form-label fw-semibold">기간</label>
                <input type="date" className="form-control form-control-sm" />
            </div>

            <button
                className="btn btn-sm btn-warning"
                onClick={onSearch}
            >
                조회
            </button>
        </div>
    );
}

