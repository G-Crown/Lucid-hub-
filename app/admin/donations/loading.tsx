export default function Loading() {
  return (
    <div className="p-8 animate-pulse">

      <div className="h-8 w-56 rounded bg-white/10 mb-8" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-white/[0.05]"
          />
        ))}

      </div>

      <div className="h-16 rounded-xl bg-white/[0.05] mb-6" />

      <div className="rounded-2xl bg-white/[0.05] h-[500px]" />

    </div>
  );
}