type Option = {
    label : string;
    value : string;
};

interface LabeledSelectProps {
    id : string;
    label : string;
    options: Option[];
    className? : string;
    stacked?: boolean;
};

function LabeledSelect({id, label, options, className, stacked}: LabeledSelectProps) {
    const containerClass = stacked
        ? `d-flex flex-column ${className ?? ""}`
        : `d-flex align-items-center ${className ?? ""}`;

    const labelClass = stacked
        ? "font-semibold mb-1"
        : "font-semibold me-2 mb-0";

    const selectClass = stacked
        ? "form-select border border-gray-300 rounded px-2 py-1 text-sm"
        : "form-select border border-gray-300 rounded px-2 py-1 text-sm w-auto";

    return (
        <div className={containerClass}>
            <label className={labelClass} htmlFor={id}>
                {label}
            </label>
            <select className={selectClass} id={id}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default LabeledSelect;