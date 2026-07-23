interface Props {
  totalDonations: number;
  totalRevenue: number;
  completed: number;
  recurring: number;
}

export default function DonationStats({
  totalDonations,
  totalRevenue,
  completed,
  recurring,
}: Props) {
  const cards = [
    {
      label: "Total Donations",
      value: totalDonations,
      color: "text-[#1A1AFF]",
    },
    {
      label: "Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      color: "text-green-400",
    },
    {
      label: "Completed",
      value: completed,
      color: "text-[#F5AB00]",
    },
    {
      label: "Recurring",
      value: recurring,
      color: "text-teal-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white/[0.04] border border-white/10 rounded-2xl p-6"
        >
          <div className={`text-3xl font-bold ${card.color}`}>
            {card.value}
          </div>

          <div className="text-white/50 text-sm mt-2">
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
}