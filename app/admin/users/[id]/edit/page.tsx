import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditUser({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!user) notFound();

  return (
    <div className="p-8 max-w-2xl">

      <h1 className="text-3xl text-white font-bold mb-8">
        Edit User
      </h1>

      <form className="space-y-5">

        <input
          defaultValue={user.full_name || ""}
          className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white"
        />

        <input
          defaultValue={user.email}
          disabled
          className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white/50"
        />

        <select
          defaultValue={user.role}
          className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white"
        >
          <option>member</option>
          <option>mentor</option>
          <option>admin</option>
          <option>super_admin</option>
        </select>

        <button
          className="bg-[#1A1AFF] px-6 py-3 rounded-xl text-white"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}
