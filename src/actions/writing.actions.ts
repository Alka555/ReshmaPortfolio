"use server";

import { cmsEnabled, staticWriting } from "@/config/portfolio-content";
import { createClient } from "@/lib/supabase/server";
import { writingSchema, WritingInput } from "@/lib/validators/writing.schema";
import { revalidatePath } from "next/cache";

export async function getWritingAction(options?: {
  category?: string;
  featured?: boolean;
  publishedOnly?: boolean;
}) {
  if (!cmsEnabled) {
    let data = [...staticWriting];
    if (options?.category && options.category !== "all") {
      data = data.filter((w) => w.category_slug === options.category);
    }
    if (options?.featured) {
      data = data.filter((w) => w.featured);
    }
    if (options?.publishedOnly !== false) {
      data = data.filter((w) => w.published);
    }
    return { data, error: null };
  }

  const supabase = await createClient();
  let query = supabase.from("writing").select("*").order("created_at", { ascending: false });

  if (options?.category && options.category !== "all") {
    query = query.eq("category_slug", options.category);
  }

  if (options?.featured) {
    query = query.eq("featured", true);
  }

  if (options?.publishedOnly !== false) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;
  if (error) {
    return { data: [], error: error.message };
  }

  return { data, error: null };
}

export async function createWritingAction(input: WritingInput) {
  const validation = writingSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.format() };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("writing")
    .insert([
      {
        title: input.title,
        category_slug: input.category,
        summary: input.summary,
        thumbnail: input.thumbnail,
        external_url: input.externalUrl,
        content: input.content,
        featured: input.featured,
        published: input.published,
      },
    ])
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/writing");
  revalidatePath("/admin/dashboard/writing");
  return { data, error: null };
}

export async function updateWritingAction(id: string, input: Partial<WritingInput>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("writing")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/writing");
  revalidatePath("/admin/dashboard/writing");
  return { data, error: null };
}

export async function deleteWritingAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("writing").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/writing");
  revalidatePath("/admin/dashboard/writing");
  return { success: true };
}
