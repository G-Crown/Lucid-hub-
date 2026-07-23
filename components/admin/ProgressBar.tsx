interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  showLabel = true,
}: ProgressBarProps) {
  const progress = Math.max(
    0,
    Math.min(100, value)
  );

  let color = "#1A1AFF";

  if (progress >= 80)
    color = "#22C55E";

  else if (progress >= 50)
    color = "#F5AB00";

  else if (progress < 30)
    color = "#EF4444";

  return (
    <div className="flex items-center gap-3">

      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">

        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />

      </div>

      {showLabel && (
        <span className="w-12 text-right text-sm text-white/60">
          {progress}%
        </span>
      )}

    </div>
  );
}