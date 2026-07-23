import { createClient } from "@/lib/supabase/server";

export interface MentorshipFilters {
  search?: string;
  status?: string;
  verified?: string;
  available?: string;
  page?: number;
  sort?: string;
  order?: "asc" | "desc";
}

const PAGE_SIZE = 20;

export async function getMentorshipStats() {
  const supabase = await createClient();

  const [{ data: pairs }, { data: profiles }] =
    await Promise.all([
      supabase
        .from("mentorship_pairs")
        .select("*"),

      supabase
        .from("mentorship_profiles")
        .select("*"),
    ]);

  const mentorships = pairs ?? [];
  const mentors = profiles ?? [];

  const averageProgress =
    mentorships.length === 0
      ? 0
      : Math.round(
          mentorships.reduce(
            (sum, item) =>
              sum + (item.progress_percent ?? 0),
            0
          ) / mentorships.length
        );

  return {
    totalPairs: mentorships.length,

    active: mentorships.filter(
      (m) => m.status === "active"
    ).length,

    pending: mentorships.filter(
      (m) => m.status === "pending"
    ).length,

    completed: mentorships.filter(
      (m) => m.status === "completed"
    ).length,

    verifiedMentors: mentors.filter(
      (m) => m.is_verified
    ).length,

    availableMentors: mentors.filter(
      (m) => m.is_available
    ).length,

    averageProgress,
  };
}

export async function getMentorshipPairs({
  search = "",
  status = "",
  page = 1,
  sort = "created_at",
  order = "desc",
}: MentorshipFilters = {}) {
  const supabase = await createClient();

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("mentorship_pairs")
    .select("*", {
      count: "exact",
    })
    .order(sort, {
      ascending: order === "asc",
    })
    .range(from, to);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const pairs = data ?? [];

  const mentorIds = [
    ...new Set(pairs.map((p) => p.mentor_id)),
  ];

  const menteeIds = [
    ...new Set(pairs.map((p) => p.mentee_id)),
  ];

  const ids = [...new Set([...mentorIds, ...menteeIds])];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id,full_name,email")
    .in("id", ids);

  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.id, p])
  );

  const rows = pairs
    .map((pair) => ({
      ...pair,

      mentor:
        profileMap.get(pair.mentor_id) ?? null,

      mentee:
        profileMap.get(pair.mentee_id) ?? null,
    }))
    .filter((pair) => {
      if (!search) return true;

      const keyword = search.toLowerCase();

      return (
        pair.mentor?.full_name
          ?.toLowerCase()
          .includes(keyword) ||

        pair.mentor?.email
          ?.toLowerCase()
          .includes(keyword) ||

        pair.mentee?.full_name
          ?.toLowerCase()
          .includes(keyword) ||

        pair.mentee?.email
          ?.toLowerCase()
          .includes(keyword)
      );
    });

  return {
    data: rows,

    count: count ?? 0,

    page,

    totalPages: Math.ceil(
      (count ?? 0) / PAGE_SIZE
    ),
  };
}

export async function getMentorshipById(
  id: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mentorship_pairs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getMentorshipProfile(
  id: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mentorship_profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}