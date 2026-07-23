import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { updateUser } from "@/app/admin/users/actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditUserPage({ params }: Props) {
  const supabase = await createClient();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!user) {
    notFound();
  }

  return (
    <div className="p-8 max-w-3xl">

      <h1 className="text-3xl font-bold text-white mb-8">
        Edit User
      </h1>

      <form
        action={updateUser.bind(null, user.id)}
        className="space-y-6"
      >

        <input
          name="full_name"
          defaultValue={user.full_name ?? ""}
          placeholder="Full Name"
          className="w-full rounded-xl bg-white/[0.05] border border-white/10 p-3 text-white"
        />

        <input
          name="phone"
          defaultValue={user.phone ?? ""}
          placeholder="Phone"
          className="w-full rounded-xl bg-white/[0.05] border border-white/10 p-3 text-white"
        />

        <input
          name="location"
          defaultValue={user.location ?? ""}
          placeholder="Location"
          className="w-full rounded-xl bg-white/[0.05] border border-white/10 p-3 text-white"
        />

        <select
          name="role"
          defaultValue={user.role}
          className="w-full rounded-xl bg-white/[0.05] border border-white/10 p-3 text-white"
        >
          <option value="member">Member</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>

        <button
          className="px-6 py-3 rounded-xl bg-[#1A1AFF] text-white"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}