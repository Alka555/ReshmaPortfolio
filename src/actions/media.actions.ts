"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadMediaAction(formData: FormData) {
  const file = formData.get("file") as File;
  const bucket = (formData.get("bucket") as string) || "project-thumbnails";

  if (!file) {
    return { error: "No file provided" };
  }

  const allowedBuckets = ["project-thumbnails", "bts-gallery", "writing-thumbnails"];
  if (!allowedBuckets.includes(bucket)) {
    return { error: "Invalid storage bucket" };
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${fileName}`;

  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { error: error.message };
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return { publicUrl: publicUrlData.publicUrl, path: data.path, error: null };
}
