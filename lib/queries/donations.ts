import { createClient } from "@/lib/supabase/server";

export async function getDonationStats() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("donations")
    .select("amount,status,is_recurring");

  const donations = data ?? [];

  return {
    totalRevenue: donations.reduce(
      (sum, donation) =>
        donation.status === "completed"
          ? sum + Number(donation.amount)
          : sum,
      0
    ),

    completed: donations.filter(
      (d) => d.status === "completed"
    ).length,

    recurring: donations.filter(
      (d) => d.is_recurring
    ).length,

    total: donations.length,
  };
}