type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function SectionHeader({
  title,
  description,
  action,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        {description && (
          <p className="text-white/50 mt-1">
            {description}
          </p>
        )}
      </div>

      {action}

    </div>
  );
}
