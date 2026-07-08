import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Events
          </h1>

          <p className="text-white/40">
            Manage all Lucid Hub events
          </p>
        </div>

        <Link
          href="/admin/events/create"
          className="bg-[#1A1AFF] hover:bg-[#3131ff] text-white px-5 py-3 rounded-xl font-semibold"
        >
          + Create Event
        </Link>

      </div>

      {/* Search */}

      <div className="mb-6">

        <input
          placeholder="Search events..."
          className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-white outline-none focus:border-[#1A1AFF]"
        />

      </div>

      {/* Table */}

      <div className="rounded-2xl border border-white/10 overflow-hidden">

        <table className="w-full">

          <thead className="bg-white/5">

            <tr>

              <th className="text-left p-4 text-white/60">
                Title
              </th>

              <th className="text-left p-4 text-white/60">
                Type
              </th>

              <th className="text-left p-4 text-white/60">
                Date
              </th>

              <th className="text-left p-4 text-white/60">
                Status
              </th>

              <th className="text-left p-4 text-white/60">
                Registrations
              </th>

              <th className="text-left p-4 text-white/60">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {events?.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-10 text-white/40"
                >
                  No events created yet.
                </td>

              </tr>

            )}

            {events?.map((event) => (

              <tr
                key={event.id}
                className="border-t border-white/10"
              >

                <td className="p-4 text-white">
                  {event.title}
                </td>

                <td className="p-4 text-white/70 capitalize">
                  {event.event_type}
                </td>

                <td className="p-4 text-white/70">
                  {new Date(event.event_date).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.is_published
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {event.is_published ? "Published" : "Draft"}
                  </span>

                </td>

                <td className="p-4 text-white">
                  {event.registered_count}
                </td>

                <td className="p-4">

                  <div className="flex gap-3">

                    <Link
                      href={`/admin/events/${event.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      className="text-red-400"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
