import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function DonationDetails({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: donation } = await supabase
    .from("donations")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!donation) {
    notFound();
  }

  return (
    <div className="p-8 max-w-3xl">

      <h1 className="text-3xl font-bold text-white mb-8">
        Donation Details
      </h1>

      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 space-y-5">

        <div>
          <p className="text-white/50">Donor</p>
          <p className="text-white">{donation.donor_name}</p>
        </div>

        <div>
          <p className="text-white/50">Email</p>
          <p className="text-white">{donation.donor_email}</p>
        </div>

        <div>
          <p className="text-white/50">Amount</p>
          <p className="text-green-400 text-2xl font-bold">
            ₦{Number(donation.amount).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-white/50">Payment Reference</p>
          <p className="text-white">{donation.payment_reference}</p>
        </div>

        <div>
          <p className="text-white/50">Status</p>
          <p className="text-white">{donation.status}</p>
        </div>

        <div>
          <p className="text-white/50">Recurring</p>
          <p className="text-white">
            {donation.is_recurring ? "Yes" : "No"}
          </p>
        </div>

        <div>
          <p className="text-white/50">Date</p>
          <p className="text-white">
            {new Date(donation.created_at).toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  );
}
