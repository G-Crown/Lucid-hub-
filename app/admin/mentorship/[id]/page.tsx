import { notFound } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import ProgressBar from "@/components/admin/ProgressBar";
import StatusBadge from "@/components/admin/StatusBadge";

interface Props {
  params: {
    id: string;
  };
}

export default async function MentorshipDetailsPage({
  params,
}: Props) {
  const supabase = await createClient();

  const { data: pair } = await supabase
    .from("mentorship_pairs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!pair) {
    notFound();
  }

  const ids = [pair.mentor_id, pair.mentee_id];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .in("id", ids);

  const mentor = profiles?.find(
    (p) => p.id === pair.mentor_id
  );

  const mentee = profiles?.find(
    (p) => p.id === pair.mentee_id
  );

  const { data: mentorProfile } = await supabase
    .from("mentorship_profiles")
    .select("*")
    .eq("user_id", pair.mentor_id)
    .single();

  const { data: menteeProfile } = await supabase
    .from("mentorship_profiles")
    .select("*")
    .eq("user_id", pair.mentee_id)
    .single();

  return (
    <div className="p-8 max-w-7xl">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Mentorship Details
          </h1>

          <p className="text-white/50 mt-2">
            Review mentorship relationship
          </p>

        </div>

        <div className="flex gap-3">

          <Link
            href="/admin/mentorship"
            className="rounded-xl border border-white/10 px-5 py-2 text-white hover:bg-white/5"
          >
            ← Back
          </Link>

          <Link
            href={`/admin/mentorship/${pair.id}/edit`}
            className="rounded-xl bg-[#1A1AFF] px-5 py-2 text-white"
          >
            Edit Pair
          </Link>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <ProfileCard
          title="Mentor"
          name={mentor?.full_name}
          email={mentor?.email}
          industry={mentorProfile?.industry}
          bio={mentorProfile?.bio}
          verified={mentorProfile?.is_verified}
          available={mentorProfile?.is_available}
        />

        <ProfileCard
          title="Mentee"
          name={mentee?.full_name}
          email={mentee?.email}
          industry={menteeProfile?.industry}
          bio={menteeProfile?.bio}
          verified={menteeProfile?.is_verified}
          available={menteeProfile?.is_available}
        />

      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8">

        <h2 className="text-xl font-semibold text-white mb-6">
          Mentorship Progress
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <InfoCard
            label="Status"
            value={
              <StatusBadge status={pair.status} />
            }
          />

          <InfoCard
            label="Progress"
            value={
              <ProgressBar
                value={pair.progress_percent}
              />
            }
          />

          <InfoCard
            label="Started"
            value={new Date(
              pair.created_at
            ).toLocaleString()}
          />

          <InfoCard
            label="Updated"
            value={new Date(
              pair.updated_at
            ).toLocaleString()}
          />

        </div>

        <div className="mt-8">

          <h3 className="text-white font-semibold mb-3">
            Goal
          </h3>

          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5 text-white/80">
            {pair.goal || "No goal recorded."}
          </div>

        </div>

        <div className="mt-6">

          <h3 className="text-white font-semibold mb-3">
            Notes
          </h3>

          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5 text-white/80 whitespace-pre-wrap">
            {pair.notes || "No notes yet."}
          </div>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">

        <h2 className="text-xl font-semibold text-white mb-5">
          Administration
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <button
            disabled
            className="rounded-xl bg-green-500/20 py-3 text-green-400 opacity-60 cursor-not-allowed"
          >
            Mark Complete
          </button>

          <button
            disabled
            className="rounded-xl bg-yellow-500/20 py-3 text-yellow-300 opacity-60 cursor-not-allowed"
          >
            Pause Pair
          </button>

          <button
            disabled
            className="rounded-xl bg-red-500/20 py-3 text-red-400 opacity-60 cursor-not-allowed"
          >
            Cancel Pair
          </button>

          <Link
            href={`/admin/mentorship/${pair.id}/edit`}
            className="rounded-xl bg-[#1A1AFF] py-3 text-center text-white"
          >
            Edit
          </Link>

        </div>

      </div>

    </div>
  );
}

function ProfileCard({
  title,
  name,
  email,
  industry,
  bio,
  verified,
  available,
}: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        {title}
      </h2>

      <div className="space-y-4">

        <InfoCard label="Name" value={name || "-"} />
        <InfoCard label="Email" value={email || "-"} />
        <InfoCard label="Industry" value={industry || "-"} />
        <InfoCard label="Verified" value={verified ? "Yes" : "No"} />
        <InfoCard label="Available" value={available ? "Yes" : "No"} />

        <div>
          <div className="text-sm text-white/40 mb-2">
            Bio
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-white/80">
            {bio || "No bio available."}
          </div>

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
  value: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-sm text-white/40 mb-2">
        {label}
      </div>

      <div className="text-white">
        {value}
      </div>
    </div>
  );
}