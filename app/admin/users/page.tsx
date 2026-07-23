import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    role?: string;
  };
}) {
  const supabase = await createClient();

  const search = searchParams?.search ?? "";
  const role = searchParams?.role ?? "";

  let query = supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,email.ilike.%${search}%`
    );
  }

  if (role) {
    query = query.eq("role", role);
  }

  const { data, error } = await query;

if (error) {
  console.error("Users Query Error:", error);
}

const users = data ?? [];

const totalMembers = users.length;
const admins = users.filter((u) => u.role === "admin").length;
const superAdmins = users.filter((u) => u.role === "super_admin").length;

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            User Management
          </h1>

          <p className="text-white/50">
            Manage Lucid Hub members
          </p>
        </div>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 gap-5 mb-8">

        <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-6">
          <div className="text-3xl text-[#1A1AFF] font-bold">
            {totalMembers}
          </div>

          <div className="text-white/50">
            Members
          </div>
        </div>

        <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-6">
          <div className="text-3xl text-[#F5AB00] font-bold">
            {admins}
          </div>

          <div className="text-white/50">
            Admins
          </div>
        </div>

        <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-6">
          <div className="text-3xl text-green-400 font-bold">
            {superAdmins}
          </div>

          <div className="text-white/50">
            Super Admins
          </div>
        </div>

      </div>

      {/* Filters */}

      <form className="flex gap-4 mb-6">

        <input
          name="search"
          defaultValue={search}
          placeholder="Search name or email..."
          className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white"
        />

        <select
          name="role"
          defaultValue={role}
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white"
        >
          <option value="">All Roles</option>
          <option value="member">Member</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>

        <button
          className="bg-[#1A1AFF] px-6 rounded-xl text-white"
        >
          Search
        </button>

      </form>

      {/* Table */}

      <div className="rounded-2xl overflow-hidden border border-white/10">

        <table className="w-full">

          <thead className="bg-white/[0.04]">

            <tr>

              <th className="text-left p-4 text-white/60">Name</th>
              <th className="text-left p-4 text-white/60">Email</th>
              <th className="text-left p-4 text-white/60">Role</th>
              <th className="text-left p-4 text-white/60">Joined</th>
              <th className="text-left p-4 text-white/60">Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t border-white/10"
              >

                <td className="p-4 text-white">
                  {user.full_name || "Unnamed"}
                </td>

                <td className="p-4 text-white/60">
                  {user.email}
                </td>

                <td className="p-4">

                  <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.role === "super_admin"
               ? "bg-yellow-500/20 text-yellow-400"
               : user.role === "admin"
               ? "bg-blue-500/20 text-blue-400"
               : user.role === "mentor"
                ? "bg-teal-500/20 text-teal-400"
               : "bg-gray-500/20 text-gray-300"
          }`}
        >
          {user.role.replace("_", " ")}
        </span>

                </td>

                <td className="p-4 text-white/50">

                  {new Date(user.created_at).toLocaleDateString()}

                </td>

                <td className="p-4 flex gap-4">

                  <Link
                    href={`/admin/users/${user.id}`}
                    className="text-[#F5AB00]"
                  >
                    View
                  </Link>

                  <Link
                    href={`/admin/users/${user.id}/edit`}
                    className="text-green-400"
                  >
                    Edit
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
