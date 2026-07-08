type Props = {
  message: string;
};

export default function EmptyState({
  message,
}: Props) {
  return (
    <div className="text-center py-16 text-white/50">
      {message}
    </div>
  );
}
