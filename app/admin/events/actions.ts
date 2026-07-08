"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const event_type = formData.get("event_type") as string;
  const event_date = formData.get("event_date") as string;
  const end_date = formData.get("end_date") as string;
  const location = formData.get("location") as string;
  const meeting_link = formData.get("meeting_link") as string;
  const price = Number(formData.get("price") || 0);
  const capacity = Number(formData.get("capacity") || 0);

  const is_virtual = formData.get("is_virtual") === "on";
  const is_published = formData.get("is_published") === "on";

  let cover_image_url = "";

  const image = formData.get("cover_image") as File;

  if (image && image.size > 0) {
    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, image);

    if (!uploadError) {
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      cover_image_url = data.publicUrl;
    }
  }

  await supabase.from("events").insert({
    title,
    description,
    event_type,
    event_date,
    end_date,
    location,
    meeting_link,
    price,
    capacity,
    is_virtual,
    is_published,
    cover_image_url,
    registered_count: 0,
  });

  revalidatePath("/admin/events");
  revalidatePath("/admin/dashboard");

  redirect("/admin/events");
}
