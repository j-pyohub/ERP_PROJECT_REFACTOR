
interface LabeledInputWithAddonProps {
    label: string;
    id: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    addon: React.ReactNode;
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    addonClassName?: string;
}

export function LabeledInputWithAddon({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  addon,

  wrapperClassName = "",
  labelClassName = "",
  inputClassName = "",
  addonClassName = "",
}: LabeledInputWithAddonProps) {
  const baseLabel =
    "block font-semibold text-gray-700 mb-1";

  const baseInput =
    "block w-full border px-3 py-2 text-sm focus:outline-none focus:ring-2";

  const baseAddon =
    "border px-3 py-2 text-sm bg-gray-100 text-gray-700";

  return (
    <div className={`w-full ${wrapperClassName}`}>
      <label htmlFor={id} className={`${baseLabel} ${labelClassName}`}>
        {label}
      </label>

      <div className="flex">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`
            ${baseInput}
            rounded-l-md
            ${inputClassName}
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }
          `}
        />

        <span
          className={`
            ${baseAddon}
            rounded-r-md
            ${addonClassName}
            ${error ? "border-red-500" : "border-gray-300"}
          `}
        >
          {addon}
        </span>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
