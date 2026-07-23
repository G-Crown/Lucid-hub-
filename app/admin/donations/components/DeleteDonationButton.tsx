"use client";

import { deleteDonation } from "../actions";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export default function DeleteDonationButton({
  id,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this donation permanently?"
    );

    if (!confirmed) return;

    await deleteDonation(id);

    router.push("/admin/donations");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-xl border border-red-500 px-5 py-3 text-red-400 hover:bg-red-500/10"
    >
      Delete Donation
    </button>
  );
}