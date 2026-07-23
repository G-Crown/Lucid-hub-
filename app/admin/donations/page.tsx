import { createClient } from "@/lib/supabase/server";

import DonationStats from "./components/DonationStats";
import DonationFilters from "./components/DonationFilters";
import DonationTable from "./components/DonationTable";
import Pagination from "@/components/admin/Pagination";

interface Props {
  searchParams?: {
    search?: string;
    status?: string;
    provider?: string;
    page?: string;
    sort?: string;
    order?: string;
  };
}

export default async function DonationsPage({
  searchParams,
}: Props) {
  const supabase = await createClient();

  const search = searchParams?.search ?? "";
  const status = searchParams?.status ?? "";
  const provider = searchParams?.provider ?? "";

  const page = Number(searchParams?.page ?? 1);

  const PAGE_SIZE = 20;

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const sort = searchParams?.sort ?? "created_at";
  const order = searchParams?.order ?? "desc";

  // ---------- Table Query ----------

  let query = supabase
    .from("donations")
    .select("*", {
      count: "exact",
    });

  if (search) {
    query = query.or(
      `donor_name.ilike.%${search}%,donor_email.ilike.%${search}%`
    );
  }

  if (status) {
    query = query.eq("status", status);
  }

  if (provider) {
    query = query.eq("provider", provider);
  }

  query = query
    .order(sort, {
      ascending: order === "asc",
    })
    .range(from, to);

  const {
    data: donations = [],
    error,
    count,
  } = await query;

  if (error) {
    throw new Error(error.message);
  }

  // ---------- Stats Query ----------

  const { data: allDonations } = await supabase
  .from("donations")
  .select("amount,status,is_recurring");

  const donationStats = allDonations ?? [];

  const totalRevenue = donationStats.reduce(
  (
    sum: number,
    donation: {
      amount: number | string;
      status: string;
      is_recurring: boolean;
    }
  ) =>
    donation.status === "completed"
      ? sum + Number(donation.amount)
      : sum,
  0
  );

const completed = donationStats.filter(
  (d) => d.status === "completed"
).length;

const recurring = donationStats.filter(
  (d) => d.is_recurring
).length;
  const totalPages = Math.ceil(
    (count ?? 0) / PAGE_SIZE
  );

  return (
    <div className="p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Donations
        </h1>

        <p className="text-white/50">
          Monitor all donations made to Lucid Hub
        </p>

      </div>

      <DonationStats
        totalDonations={count ?? 0}
        totalRevenue={totalRevenue}
        completed={completed}
        recurring={recurring}
      />

      <DonationFilters
        search={search}
        status={status}
        provider={provider}
      />

      <div className="mb-4 text-sm text-white/40">
        Showing{" "}
        <span className="text-white font-semibold">
          {donations.length}
        </span>{" "}
        of{" "}
        <span className="text-white font-semibold">
          {count ?? 0}
        </span>{" "}
        donations
      </div>

      {donations.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center">

          <h2 className="text-xl text-white mb-2">
            No donations found
          </h2>

          <p className="text-white/40">
            Try changing your search or filters.
          </p>

        </div>
      ) : (
        <>
          <DonationTable donations={donations} />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/admin/donations"
          />
        </>
      )}

    </div>
  );
}