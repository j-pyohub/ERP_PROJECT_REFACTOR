type LabeledInputProps = {
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

export function LabeledInput({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  error,

  wrapperClassName = "",
  labelClassName = "",
  inputClassName = "",
}: LabeledInputProps) {
  const baseLabel =
    "block font-semibold mb-1";

  const baseInput =
    "block w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2";

  return (
    <div className={`w-full ${wrapperClassName}`}>
      <label
        htmlFor={id}
        className={`${baseLabel} ${labelClassName}`}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          ${baseInput}
          ${inputClassName}
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }
        `}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
