"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Update a user's profile.
 */
export async function updateUser(id: string, formData: FormData) {
  const supabase = await createClient();

  const updates = {
    full_name: formData.get("full_name") as string,
    phone: formData.get("phone") as string,
    location: formData.get("location") as string,
    role: formData.get("role") as string,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${id}`);

  redirect(`/admin/users/${id}`);
}

/**
 * Delete a user.
 * (Temporarily disabled until we implement safe deletion.)
 */
export async function deleteUser(id: string) {
  console.log("Delete requested:", id);

  throw new Error(
    "User deletion has not been enabled yet."
  );
}