import {
  getMentorshipPairs,
  getMentorshipStats,
} from "@/lib/queries";

import MentorshipStats from "./components/MentorshipStats";
import MentorshipFilters from "./components/MentorshipFilters";
import MentorshipTable from "./components/MentorshipTable";
import Pagination from "@/components/admin/Pagination";
import MentorshipTable from "./components/MentorshipTable";
import Pagination from "@/components/admin/Pagination";

interface Props {
  searchParams?: {
    search?: string;
    status?: string;
    page?: string;
    sort?: string;
    order?: "asc" | "desc";
  };
}

export default async function MentorshipPage({
  searchParams,
}: Props) {
  const search = searchParams?.search ?? "";
  const status = searchParams?.status ?? "";
  const page = Number(searchParams?.page ?? "1");
  const sort = searchParams?.sort ?? "created_at";
  const order =
    searchParams?.order ?? "desc";

  const stats =
    await getMentorshipStats();

  const mentorships =
    await getMentorshipPairs({
      search,
      status,
      page,
      sort,
      order,
    });

  return (
    <div className="p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Mentorship Management
        </h1>

        <p className="mt-2 text-white/50">
          Manage mentors, mentees and
          mentorship progress.
        </p>

      </div>

      <MentorshipStats
        totalPairs={stats.totalPairs}
        active={stats.active}
        pending={stats.pending}
        completed={stats.completed}
        verifiedMentors={stats.verifiedMentors}
        availableMentors={stats.availableMentors}
        averageProgress={stats.averageProgress}
      />

      <MentorshipFilters
        search={search}
        status={status}
        sort={sort}
        order={order}
      />

      <MentorshipTable
        mentorships={mentorships.data}
      />
      <Pagination
        currentPage={page}
        totalPages={mentorships.totalPages}
        basePath="/admin/mentorship"
      />

    </div>
  );
}