import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function UserDetailsPage({ params }: Props) {
  const supabase = await createClient();

  // Fetch user
  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !user) {
    notFound();
  }

  // Fetch statistics
  const registrationsResult = await supabase
    .from("event_registrations")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);

  const mentorshipResult = await supabase
    .from("mentorship_pairs")
    .select("*", {
      count: "exact",
      head: true,
    })
    .or(`mentor_id.eq.${user.id},mentee_id.eq.${user.id}`);


const { data: donations } = await supabase
  .from("donations")
  .select("amount")
  .eq("donor_email", user.email);

const donationList = donations ?? [];

const totalDonations = donationList.reduce(
  (sum: number, donation: { amount: number | string }) =>
    sum + Number(donation.amount),
  0
);

const registrationCount = registrationsResult.count ?? 0;
const mentorshipCount = mentorshipResult.count ?? 0;


  const initials =
    user.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="p-8 max-w-6xl">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-white">
            User Details
          </h1>

          <p className="text-white/50">
            View member profile
          </p>

        </div>

        <div className="flex gap-3">

          <Link
            href="/admin/users"
            className="px-5 py-2 rounded-xl border border-white/10 text-white hover:bg-white/5"
          >
            ← Back
          </Link>

          <Link
            href={`/admin/users/${user.id}/edit`}
            className="px-5 py-2 rounded-xl bg-[#1A1AFF] text-white"
          >
            Edit User
          </Link>

        </div>

      </div>

      {/* Profile */}

      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">

        <div className="flex items-center gap-6">

          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.full_name || "User"}
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#1A1AFF] flex items-center justify-center text-3xl font-bold text-white">
              {initials}
            </div>
          )}

          <div>

            <h2 className="text-2xl font-bold text-white">
              {user.full_name || "Unnamed User"}
            </h2>

            <p className="text-white/50 mt-1">
              {user.email}
            </p>

            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#1A1AFF]/20 text-[#9da0ff] text-sm">
              {user.role}
            </span>

          </div>

        </div>

        {/* Personal Information */}

        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <InfoCard
            label="Phone"
            value={user.phone || "-"}
          />

          <InfoCard
            label="Location"
            value={user.location || "-"}
          />

          <InfoCard
            label="Joined"
            value={new Date(user.created_at).toLocaleString()}
          />

          <InfoCard
            label="Last Updated"
            value={new Date(user.updated_at).toLocaleString()}
          />

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-5 mt-8">

        <InfoCard
          label="Events"
          value={registrationCount} 
        />

        <InfoCard
          label="Mentorship"
          value={mentorshipCount} 
        />

        <InfoCard
          label="Donations"
          value={`₦${totalDonations.toLocaleString()}`}
        />

        <InfoCard
          label="Member Since"
          value={new Date(user.created_at).getFullYear().toString()}
        />

      </div>

      {/* Administration */}

      <div className="mt-8 bg-white/[0.04] border border-white/10 rounded-2xl p-6">

        <h2 className="text-xl font-semibold text-white mb-5">
          Administration
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <Link
            href={`/admin/users/${user.id}/edit`}
            className="bg-[#1A1AFF] text-white rounded-xl px-5 py-3 text-center hover:bg-[#3434ff]"
          >
            Edit User
          </Link>

          <button
            disabled
            className="rounded-xl bg-[#F5AB00] text-black px-5 py-3 opacity-60 cursor-not-allowed"
          >
            Password Reset (Coming Soon)
          </button>

          <a
            href={`mailto:${user.email}`}
            className="rounded-xl bg-white/10 text-white px-5 py-3 text-center hover:bg-white/20"
          >
            Send Email
          </a>

          <button
            disabled
            className="rounded-xl bg-red-500/20 text-red-400 px-5 py-3 opacity-60 cursor-not-allowed"
          >
            Deactivate User (Coming Soon)
          </button>

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
  value: string | number;
}) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">

      <p className="text-white/40 text-sm">
        {label}
      </p>

      <p className="text-white text-xl font-semibold mt-2">
        {value}
      </p>

    </div>
  );
}