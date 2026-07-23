import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

import DonationStatusBadge from "../components/DonationStatusBadge";
import DonationStatusForm from "../components/DonationStatusForm";
import DeleteDonationButton from "../components/DeleteDonationButton";

interface Props {
  params: {
    id: string;
  };
}

export default async function DonationDetailsPage({
  params,
}: Props) {
  const supabase = await createClient();

  const { data: donation, error } = await supabase
    .from("donations")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !donation) {
    notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Donation Details
          </h1>

          <p className="text-white/50 mt-1">
            View and manage an individual donation.
          </p>

        </div>

        <Link
          href="/admin/donations"
          className="px-5 py-2 rounded-xl border border-white/10 text-white hover:bg-white/5"
        >
          ← Back to Donations
        </Link>

      </div>

      {/* Donation Card */}

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              {donation.donor_name || "Anonymous"}
            </h2>

            <p className="text-white/50 mt-2">
              {donation.donor_email || "No email supplied"}
            </p>

          </div>

          <DonationStatusBadge
            status={donation.status}
          />

        </div>

        {/* Information */}

        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <InfoCard
            label="Amount"
            value={`₦${Number(donation.amount).toLocaleString()}`}
          />

          <InfoCard
            label="Payment Provider"
            value={donation.provider || "-"}
          />

          <InfoCard
            label="Recurring Donation"
            value={donation.is_recurring ? "Yes" : "No"}
          />

          <InfoCard
            label="Payment Reference"
            value={donation.payment_reference || "-"}
          />

          <InfoCard
            label="Created"
            value={new Date(
              donation.created_at
            ).toLocaleString()}
          />

          <InfoCard
            label="Donation ID"
            value={donation.id}
          />

        </div>

      </div>

      {/* Administration */}

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8">

        <h2 className="text-xl font-semibold text-white mb-6">
          Administration
        </h2>

        <div className="flex flex-wrap gap-5">

          <DonationStatusForm
            id={donation.id}
            currentStatus={donation.status}
          />

          <DeleteDonationButton
            id={donation.id}
          />

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">

      <p className="text-sm text-white/40">
        {label}
      </p>

      <p className="mt-2 text-white break-all">
        {value}
      </p>

    </div>
  );
}