import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const [
    events,
    donations,
    users,
    mentorships,
  ] = await Promise.all([
    supabase
      .from("events")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("donations")
      .select("amount,status"),

    supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("mentorship_pairs")
      .select("*", {
        count: "exact",
        head: true,
      }),
  ]);

  const donationRows = donations.data ?? [];

  const revenue = donationRows.reduce(
    (sum, donation) =>
      donation.status === "completed"
        ? sum + Number(donation.amount)
        : sum,
    0
  );

  return {
    totalEvents: events.count ?? 0,
    totalUsers: users.count ?? 0,
    totalMentorships: mentorships.count ?? 0,
    totalRevenue: revenue,
  };
}