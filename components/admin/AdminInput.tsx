type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function AdminInput({
  label,
  ...props
}: Props) {
  return (
    <div>

      <label className="block text-white/70 mb-2">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-lg bg-[#10203C] border border-white/10 px-4 py-3 text-white"
      />

    </div>
  );
}
