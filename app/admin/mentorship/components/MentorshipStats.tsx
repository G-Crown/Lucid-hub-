interface Props {
  totalPairs: number;
  active: number;
  pending: number;
  completed: number;
  verifiedMentors: number;
  availableMentors: number;
  averageProgress: number;
}

export default function MentorshipStats({
  totalPairs,
  active,
  pending,
  completed,
  verifiedMentors,
  availableMentors,
  averageProgress,
}: Props) {
  const cards = [
    {
      title: "Mentorships",
      value: totalPairs,
    },
    {
      title: "Active",
      value: active,
    },
    {
      title: "Pending",
      value: pending,
    },
    {
      title: "Completed",
      value: completed,
    },
    {
      title: "Verified Mentors",
      value: verifiedMentors,
    },
    {
      title: "Available Mentors",
      value: availableMentors,
    },
    {
      title: "Average Progress",
      value: `${averageProgress}%`,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
        >
          <p className="text-sm text-white/50">
            {card.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}