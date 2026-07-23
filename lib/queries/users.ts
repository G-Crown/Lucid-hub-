import { createClient } from "@/lib/supabase/server";

export async function getUserStats() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("role");

  const users = data ?? [];

  return {
    total: users.length,

    admins: users.filter(
      (u) => u.role === "admin"
    ).length,

    superAdmins: users.filter(
      (u) => u.role === "super_admin"
    ).length,
  };
}