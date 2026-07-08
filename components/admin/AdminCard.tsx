type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function AdminCard({
  title,
  children,
}: Props) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">

      {title && (
        <h2 className="text-xl font-semibold text-white mb-6">
          {title}
        </h2>
      )}

      {children}

    </div>
  );
}
