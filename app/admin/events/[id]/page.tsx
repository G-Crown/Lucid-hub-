import { createClient } from "@/lib/supabase/server";
import { updateEvent } from "../actions";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditEventPage({
  params,
}: Props) {

  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!event) notFound();

  async function update(formData: FormData) {
    "use server";
    await updateEvent(params.id, formData);
  }

  return (
    <div className="p-8 max-w-4xl">

      <h1 className="text-3xl font-bold text-white mb-8">
        Edit Event
      </h1>

      <form
        action={update}
        className="space-y-6"
      >

        <input
          name="existing_image"
          defaultValue={event.cover_image_url}
          hidden
        />

        <input
          name="title"
          defaultValue={event.title}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
        />

        <textarea
          name="description"
          rows={6}
          defaultValue={event.description}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
        />

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="datetime-local"
            name="event_date"
            defaultValue={
              event.event_date.substring(0,16)
            }
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

          <input
            type="datetime-local"
            name="end_date"
            defaultValue={
              event.end_date.substring(0,16)
            }
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

        </div>

        <input
          name="location"
          defaultValue={event.location}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
        />

        <input
          name="meeting_link"
          defaultValue={event.meeting_link}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
        />

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="number"
            name="price"
            defaultValue={event.price}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

          <input
            type="number"
            name="capacity"
            defaultValue={event.capacity}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

        </div>

        <div>

          {event.cover_image_url && (

            <img
              src={event.cover_image_url}
              className="rounded-xl w-64 mb-4"
            />

          )}

          <input
            type="file"
            name="cover_image"
          />

        </div>

        <label className="flex gap-2 text-white">

          <input
            type="checkbox"
            name="is_virtual"
            defaultChecked={event.is_virtual}
          />

          Virtual Event

        </label>

        <label className="flex gap-2 text-white">

          <input
            type="checkbox"
            name="is_published"
            defaultChecked={event.is_published}
          />

          Published

        </label>

        <button
          className="bg-[#1A1AFF] text-white px-8 py-4 rounded-xl"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}
