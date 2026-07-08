type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function AdminSelect({
  label,
  options,
  ...props
}: Props) {
  return (
    <div>

      <label className="block text-white/70 mb-2">
        {label}
      </label>

      <select
        {...props}
        className="w-full rounded-lg bg-[#10203C] border border-white/10 px-4 py-3 text-white"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
}
