import Link from "next/link";
import ProgressBar from "@/components/admin/ProgressBar";
import StatusBadge from "@/components/admin/StatusBadge";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
}

interface MentorshipPair {
  id: string;
  mentor_id: string;
  mentee_id: string;
  status: string;
  progress_percent: number;
  goal: string | null;
  created_at: string;

  mentor: Profile | null;
  mentee: Profile | null;
}

interface Props {
  mentorships: MentorshipPair[];
}

export default function MentorshipTable({
  mentorships,
}: Props) {
  if (mentorships.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-16 text-center">
        <h3 className="text-xl font-semibold text-white">
          No Mentorship Records
        </h3>

        <p className="mt-3 text-white/50">
          No mentorship relationships match your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-white/[0.04]">

            <tr>

              <th className="px-6 py-4 text-left text-sm text-white/60">
                Mentor
              </th>

              <th className="px-6 py-4 text-left text-sm text-white/60">
                Mentee
              </th>

              <th className="px-6 py-4 text-left text-sm text-white/60">
                Goal
              </th>

              <th className="px-6 py-4 text-left text-sm text-white/60">
                Progress
              </th>

              <th className="px-6 py-4 text-left text-sm text-white/60">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm text-white/60">
                Started
              </th>

              <th className="px-6 py-4 text-right text-sm text-white/60">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {mentorships.map((pair) => (

              <tr
                key={pair.id}
                className="border-t border-white/10 hover:bg-white/[0.03]"
              >

                {/* Mentor */}

                <td className="px-6 py-5">

                  <div>

                    <div className="font-medium text-white">
                      {pair.mentor?.full_name ?? "Unknown"}
                    </div>

                    <div className="text-sm text-white/50">
                      {pair.mentor?.email}
                    </div>

                  </div>

                </td>

                {/* Mentee */}

                <td className="px-6 py-5">

                  <div>

                    <div className="font-medium text-white">
                      {pair.mentee?.full_name ?? "Unknown"}
                    </div>

                    <div className="text-sm text-white/50">
                      {pair.mentee?.email}
                    </div>

                  </div>

                </td>

                {/* Goal */}

                <td className="px-6 py-5">

                  <div className="max-w-xs truncate text-white/70">
                    {pair.goal || "-"}
                  </div>

                </td>

                {/* Progress */}

                <td className="px-6 py-5 w-64">

                  <ProgressBar
                    value={pair.progress_percent}
                  />

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <StatusBadge
                    status={pair.status}
                  />

                </td>

                {/* Date */}

                <td className="px-6 py-5 text-white/60">

                  {new Date(
                    pair.created_at
                  ).toLocaleDateString()}

                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-3">

                    <Link
                      href={`/admin/mentorship/${pair.id}`}
                      className="rounded-lg border border-[#1A1AFF] px-3 py-1 text-sm text-[#7f8cff] hover:bg-[#1A1AFF]/10"
                    >
                      View
                    </Link>

                    <Link
                      href={`/admin/mentorship/${pair.id}/edit`}
                      className="rounded-lg bg-[#1A1AFF] px-3 py-1 text-sm text-white hover:bg-[#3434ff]"
                    >
                      Edit
                    </Link>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}