interface DonationStatusBadgeProps {
  status: string;
}

export default function DonationStatusBadge({
  status,
}: DonationStatusBadgeProps) {
  const value = status.toLowerCase();

  let classes =
    "bg-white/10 text-white";

  switch (value) {
    case "completed":
      classes =
        "bg-green-500/20 text-green-400";
      break;

    case "pending":
      classes =
        "bg-yellow-500/20 text-yellow-400";
      break;

    case "failed":
      classes =
        "bg-red-500/20 text-red-400";
      break;

    case "refunded":
      classes =
        "bg-blue-500/20 text-blue-400";
      break;
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${classes}`}
    >
      {status}
    </span>
  );
}