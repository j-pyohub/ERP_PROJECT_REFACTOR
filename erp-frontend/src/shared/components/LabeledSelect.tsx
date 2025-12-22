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
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function LabeledSelect({id, label, options, className, stacked, value, onChange}: LabeledSelectProps) {
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
      <select
        id={id}
        className={selectClass}
        value={value}
        onChange={onChange}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
    );
}
export default LabeledSelect;