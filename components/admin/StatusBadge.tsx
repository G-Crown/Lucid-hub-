interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles: Record<
    string,
    string
  > = {
    active:
      "bg-green-500/20 text-green-400",

    pending:
      "bg-yellow-500/20 text-yellow-300",

    completed:
      "bg-blue-500/20 text-blue-300",

    cancelled:
      "bg-red-500/20 text-red-300",

    failed:
      "bg-red-500/20 text-red-300",

    refunded:
      "bg-orange-500/20 text-orange-300",

    published:
      "bg-green-500/20 text-green-400",

    draft:
      "bg-gray-500/20 text-gray-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
        styles[status] ??
        "bg-white/10 text-white"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}