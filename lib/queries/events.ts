import { createClient } from "@/lib/supabase/server";

export async function getPublishedEventsCount() {
  const supabase = await createClient();

  const { count } = await supabase
    .from("events")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("is_published", true);

  return count ?? 0;
}