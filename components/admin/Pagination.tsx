import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-8">

      <Link
        href={`${basePath}?page=${Math.max(
          currentPage - 1,
          1
        )}`}
        className="px-4 py-2 rounded-xl border border-white/10 text-white"
      >
        Previous
      </Link>

      <span className="text-white/60">

        Page {currentPage} of {totalPages}

      </span>

      <Link
        href={`${basePath}?page=${Math.min(
          currentPage + 1,
          totalPages
        )}`}
        className="px-4 py-2 rounded-xl border border-white/10 text-white"
      >
        Next
      </Link>

    </div>
  );
}