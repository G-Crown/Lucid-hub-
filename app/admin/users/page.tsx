import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function UsersPage() {
  const supabase = await createClient();

  const { data: users = [] } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const totalMembers = users.length;
  const admins = users.filter(u => u.role === "admin").length;
  const superAdmins = users.filter(u => u.role === "super_admin").length;

  return (
    <div className="p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          User Management
        </h1>

        <p className="text-white/50">
          Manage Lucid Hub members
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-3 gap-5 mb-8">

        <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-6">
          <div className="text-3xl font-bold text-[#1A1AFF]">
            {totalMembers}
          </div>

          <p className="text-white/50">
            Members
          </p>
        </div>

        <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-6">
          <div className="text-3xl font-bold text-[#F5AB00]">
            {admins}
          </div>

          <p className="text-white/50">
            Admins
          </p>
        </div>

        <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-6">
          <div className="text-3xl font-bold text-green-400">
            {superAdmins}
          </div>

          <p className="text-white/50">
            Super Admins
          </p>
        </div>

      </div>

      {/* Users Table */}

      <div className="bg-white/[0.04] rounded-2xl border border-white/10 overflow-hidden">

        <table className="w-full">

          <thead className="bg-white/5">

            <tr>

              <th className="text-left p-4 text-white/70">
                Name
              </th>

              <th className="text-left p-4 text-white/70">
                Email
              </th>

              <th className="text-left p-4 text-white/70">
                Role
              </th>

              <th className="text-left p-4 text-white/70">
                Joined
              </th>

              <th className="text-left p-4 text-white/70">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t border-white/10"
              >

                <td className="p-4 text-white">
                  {user.full_name || "No Name"}
                </td>

                <td className="p-4 text-white/60">
                  {user.email}
                </td>

                <td className="p-4">

                  <span className="px-3 py-1 rounded-full text-xs bg-[#1A1AFF]/20 text-[#7d7dff]">

                    {user.role}

                  </span>

                </td>

                <td className="p-4 text-white/50">

                  {new Date(user.created_at).toLocaleDateString()}

                </td>

                <td className="p-4">

                  <Link
                    href={`/admin/users/${user.id}`}
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
