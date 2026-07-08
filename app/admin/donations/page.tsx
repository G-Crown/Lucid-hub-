import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DonationsPage({
  searchParams,
}: {
  searchParams?: {
    status?: string;
    search?: string;
  };
}) {
  const supabase = await createClient();

  const status = searchParams?.status || "";
  const search = searchParams?.search || "";

  let query = supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  if (search) {
    query = query.or(
      `donor_name.ilike.%${search}%,donor_email.ilike.%${search}%`
    );
  }

  const { data: donations = [] } = await query;

  const totalAmount = donations
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + Number(d.amount), 0);

  const completed = donations.filter(
    (d) => d.status === "completed"
  ).length;

  const pending = donations.filter(
    (d) => d.status === "pending"
  ).length;

  const recurring = donations.filter(
    (d) => d.is_recurring
  ).length;

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Donations
          </h1>

          <p className="text-white/50">
            Manage all donations
          </p>
        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-5 mb-8">

        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <div className="text-3xl font-bold text-green-400">
            ₦{totalAmount.toLocaleString()}
          </div>
          <div className="text-white/50">
            Total Received
          </div>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <div className="text-3xl font-bold text-[#1A1AFF]">
            {completed}
          </div>
          <div className="text-white/50">
            Completed
          </div>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <div className="text-3xl font-bold text-yellow-400">
            {pending}
          </div>
          <div className="text-white/50">
            Pending
          </div>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <div className="text-3xl font-bold text-purple-400">
            {recurring}
          </div>
          <div className="text-white/50">
            Recurring
          </div>
        </div>

      </div>

      {/* Search */}

      <form className="flex gap-4 mb-6">

        <input
          name="search"
          defaultValue={search}
          placeholder="Search donor..."
          className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white"
        />

        <select
          name="status"
          defaultValue={status}
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <button className="bg-[#1A1AFF] px-6 rounded-xl text-white">
          Filter
        </button>

      </form>

      {/* Table */}

      <div className="rounded-xl overflow-hidden border border-white/10">

        <table className="w-full">

          <thead className="bg-white/[0.05]">

            <tr>

              <th className="text-left p-4 text-white/60">
                Donor
              </th>

              <th className="text-left p-4 text-white/60">
                Amount
              </th>

              <th className="text-left p-4 text-white/60">
                Status
              </th>

              <th className="text-left p-4 text-white/60">
                Recurring
              </th>

              <th className="text-left p-4 text-white/60">
                Date
              </th>

              <th className="text-left p-4 text-white/60">
                Details
              </th>

            </tr>

          </thead>

          <tbody>

            {donations.map((donation) => (

              <tr
                key={donation.id}
                className="border-t border-white/10"
              >

                <td className="p-4">

                  <div className="text-white">
                    {donation.donor_name}
                  </div>

                  <div className="text-white/40 text-sm">
                    {donation.donor_email}
                  </div>

                </td>

                <td className="p-4 text-green-400 font-semibold">
                  ₦{Number(donation.amount).toLocaleString()}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      donation.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : donation.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {donation.status}
                  </span>

                </td>

                <td className="p-4 text-white">

                  {donation.is_recurring ? "Yes" : "No"}

                </td>

                <td className="p-4 text-white/50">

                  {new Date(
                    donation.created_at
                  ).toLocaleDateString()}

                </td>

                <td className="p-4">

                  <Link
                    href={`/admin/donations/${donation.id}`}
                    className="text-[#F5AB00]"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
