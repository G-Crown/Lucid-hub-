type Props = {
  title: string;
  value: string | number;
  color?: string;
};

export default function StatsCard({
  title,
  value,
  color = "text-[#1A1AFF]",
}: Props) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">

      <div className={`text-3xl font-bold ${color}`}>
        {value}
      </div>

      <div className="text-white/50 mt-2">
        {title}
      </div>

    </div>
  );
}
