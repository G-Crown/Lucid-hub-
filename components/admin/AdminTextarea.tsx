type Props =
React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export default function AdminTextarea({
  label,
  ...props
}: Props) {
  return (
    <div>

      <label className="block text-white/70 mb-2">
        {label}
      </label>

      <textarea
        {...props}
        className="w-full rounded-lg bg-[#10203C] border border-white/10 px-4 py-3 text-white"
      />

    </div>
  );
}
