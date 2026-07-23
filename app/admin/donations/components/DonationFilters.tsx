interface Props {
  search?: string;
  status?: string;
  provider?: string;
}

export default function DonationFilters({
  search,
  status,
  provider,
}: Props) {
  return (
    <form
      className="grid md:grid-cols-4 gap-4 mb-8"
      method="GET"
    >
      <input
        name="search"
        defaultValue={search}
        placeholder="Search donor..."
        className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white"
      />

      <select
        name="status"
        defaultValue={status}
        className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white"
      >
        <option value="">All Status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
        <option value="refunded">Refunded</option>
      </select>

      <input
        name="provider"
        defaultValue={provider}
        placeholder="Provider"
        className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white"
      />

      <select
        name="sort"> 
        <option value="created_at">
          Newest
        </option>
        <option value="amount">
          Amount
        </option>
        <option value="donor_name">
          Donor Name
        </option>
        <option value="status">
          Status
        </option>
      </select>

      <select name="order">
        <option value="desc">
          Descending
        </option>
        <option value="asc">
          Ascending
        </option>
      </select>
      <button
        className="rounded-xl bg-[#1A1AFF] text-white font-medium"
      >
        <div className="rounded-2x1 border-dashed border-white/10 p-16 text-center">
        <h2 className="text-xl text-white mb-2">
          No donations found
        
        </h2>
        <p className="text-white/40">
        Try changing your search or filters.
        </p>
        </div>
      </button>
    </form>
  );
}