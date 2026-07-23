interface Props {
  search: string;
  status: string;
  sort: string;
  order: string;
}

export default function MentorshipFilters({
  search,
  status,
  sort,
  order,
}: Props) {
  return (
    <form
      className="mb-8 grid gap-4 lg:grid-cols-5"
      method="GET"
    >
      <input
        type="text"
        name="search"
        defaultValue={search}
        placeholder="Search mentor or mentee..."
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#1A1AFF] focus:outline-none"
      />

      <select
        name="status"
        defaultValue={status}
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <select
        name="sort"
        defaultValue={sort}
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
      >
        <option value="created_at">Created Date</option>
        <option value="updated_at">Last Updated</option>
        <option value="progress_percent">Progress</option>
      </select>

      <select
        name="order"
        defaultValue={order}
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>

      <button
        type="submit"
        className="rounded-xl bg-[#1A1AFF] px-6 py-3 font-medium text-white transition hover:bg-[#3434ff]"
      >
        Apply Filters
      </button>
    </form>
  );
}