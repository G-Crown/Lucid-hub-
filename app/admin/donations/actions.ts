"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateDonationStatus(
  id: string,
  status: string
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("donations")
    .update({
      status,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/donations");
  revalidatePath(`/admin/donations/${id}`);
  revalidatePath("/admin/dashboard");
}

export async function deleteDonation(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("donations")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/donations");
  revalidatePath("/admin/dashboard");
}