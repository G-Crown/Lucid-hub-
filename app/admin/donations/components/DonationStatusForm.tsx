"use client";

import { useState } from "react";
import { updateDonationStatus } from "../actions";

interface Props {
  id: string;
  currentStatus: string;
}

export default function DonationStatusForm({
  id,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    try {
      await updateDonationStatus(id, status);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-3 items-center">

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
        <option value="refunded">Refunded</option>
      </select>

      <button
        onClick={submit}
        disabled={loading}
        className="rounded-xl bg-[#1A1AFF] px-5 py-3 text-white hover:bg-[#3434ff] disabled:opacity-60"
      >
        {loading ? "Updating..." : "Update Status"}
      </button>

    </div>
  );
}