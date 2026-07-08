import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function UserDetails({
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

  if (!user) {
    notFound();
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold text-white mb-8">
        User Profile
      </h1>

      <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-8 space-y-4">

        <p className="text-white">
          <strong>Name:</strong>{" "}
          {user.full_name || "No Name"}
        </p>

        <p className="text-white">
          <strong>Email:</strong>{" "}
          {user.email}
        </p>

        <p className="text-white">
          <strong>Role:</strong>{" "}
          {user.role}
        </p>

        <p className="text-white">
          <strong>Phone:</strong>{" "}
          {user.phone || "-"}
        </p>

        <p className="text-white">
          <strong>Location:</strong>{" "}
          {user.location || "-"}
        </p>

        <p className="text-white">
          <strong>Joined:</strong>{" "}
          {new Date(user.created_at).toLocaleString()}
        </p>

      </div>

    </div>
  );
}
