type Props = {
  status: string;
};

export default function AdminBadge({
  status,
}: Props) {

  const colors = {
    published:
      "bg-green-500/20 text-green-400",

    draft:
      "bg-yellow-500/20 text-yellow-400",

    pending:
      "bg-yellow-500/20 text-yellow-400",

    completed:
      "bg-green-500/20 text-green-400",

    failed:
      "bg-red-500/20 text-red-400",

    active:
      "bg-blue-500/20 text-blue-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs ${
        colors[status as keyof typeof colors] ??
        "bg-white/10 text-white"
      }`}
    >
      {status}
    </span>
  );
}
