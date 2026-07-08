interface Props {
  params: {
    id: string;
  };
}

export default function EditEventPage({ params }: Props) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white">
        Edit Event
      </h1>

      <p className="text-white/40 mt-3">
        Event ID: {params.id}
      </p>
    </div>
  );
}
