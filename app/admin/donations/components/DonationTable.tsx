import Link from "next/link";
import DonationStatusBadge from "./DonationStatusBadge";

interface Donation {
  id: string;
  donor_name: string | null;
  donor_email: string | null;
  amount: number;
  provider: string | null;
  status: string;
  is_recurring: boolean;
  created_at: string;
}

interface DonationTableProps {
  donations: Donation[];
}

export default function DonationTable({
  donations,
}: DonationTableProps) {
  if (donations.length === 0) {
    return (
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-10 text-center">
        <p className="text-white/50">
          No donations found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <table className="w-full">
        <thead className="bg-white/[0.05]">
          <tr>
            <th className="text-left p-4 text-white/60">
              Donor
            </th>

            <th className="text-left p-4 text-white/60">
              Email
            </th>

            <th className="text-left p-4 text-white/60">
              Amount
            </th>

            <th className="text-left p-4 text-white/60">
              Provider
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

            <th className="text-right p-4 text-white/60">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {donations.map((donation) => (
            <tr
              key={donation.id}
              className="border-t border-white/10 hover:bg-white/[0.03]"
            >
              <td className="p-4 text-white">
                {donation.donor_name || "Anonymous"}
              </td>

              <td className="p-4 text-white/60">
                {donation.donor_email || "-"}
              </td>

              <td className="p-4 text-green-400 font-semibold">
                ₦{Number(donation.amount).toLocaleString()}
              </td>

              <td className="p-4 text-white/70">
                {donation.provider || "-"}
              </td>

              <td className="p-4">
                <DonationStatusBadge
                  status={donation.status}
                />
              </td>

              <td className="p-4 text-white/70">
                {donation.is_recurring ? "Yes" : "No"}
              </td>

              <td className="p-4 text-white/50">
                {new Date(
                  donation.created_at
                ).toLocaleDateString()}
              </td>

              <td className="p-4 text-right">
                <Link
                  href={`/admin/donations/${donation.id}`}
                  className="text-[#F5AB00] hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}