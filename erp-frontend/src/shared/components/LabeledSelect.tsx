type Option = {
  label: string;
  value: string;
};

interface LabeledSelectProps {
  id: string;
  label: string;
  options: Option[];

  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  wrapperClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
}
function LabeledSelect({
  id,
  label,
  options,
  value,
  onChange,

  wrapperClassName = "",
  labelClassName = "",
  selectClassName = "",
}: LabeledSelectProps) {
  const baseLabel =
    "block font-semibold mb-1";

  const baseSelect =
    "block rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className={`${wrapperClassName}`}>
      <label
        htmlFor={id}
        className={`${baseLabel} ${labelClassName}`}
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${baseSelect} ${selectClassName}`}
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
