import { createEvent } from "../actions";

export default function CreateEventPage() {
  return (
    <div className="p-8 max-w-4xl">

      <h1 className="text-3xl font-bold text-white mb-8">
        Create Event
      </h1>

      <form action={createEvent} className="space-y-6">

        <input
          name="title"
          required
          placeholder="Event Title"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
        />

        <textarea
          name="description"
          rows={5}
          placeholder="Description"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
        />

        <div className="grid md:grid-cols-2 gap-6">

          <select
            name="event_type"
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          >
            <option value="conference">Conference</option>
            <option value="training">Training</option>
            <option value="webinar">Webinar</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="datetime-local"
            name="event_date"
            required
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

          <input
            type="datetime-local"
            name="end_date"
            required
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

        </div>

        <input
          type="url"
          name="meeting_link"
          placeholder="Meeting Link"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
        />

        <div>

          <label className="text-white block mb-2">
            Cover Image
          </label>

          <input
            type="file"
            name="cover_image"
            accept="image/*"
            className="text-white"
          />

        </div>

        <div className="flex gap-8">

          <label className="text-white flex items-center gap-2">

            <input
              type="checkbox"
              name="is_virtual"
            />

            Virtual Event

          </label>

          <label className="text-white flex items-center gap-2">

            <input
              type="checkbox"
              name="is_published"
            />

            Publish Immediately

          </label>

        </div>

        <button
          className="bg-[#1A1AFF] hover:bg-blue-700 px-8 py-4 rounded-xl text-white font-semibold"
        >
          Create Event
        </button>

      </form>

    </div>
  );
}
