"use server";

import { createClient } from "@/lib/supabase/server";
import { settingsSchema, SettingsInput } from "@/lib/validators/settings.schema";
import { revalidatePath } from "next/cache";

export async function getSettingsAction() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updateSettingsAction(input: SettingsInput) {
  const validation = settingsSchema.safeParse(input);
  if (!validation.success) return { error: validation.error.format() };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("settings")
    .upsert({
      id: 1,
      site_title: input.siteTitle,
      site_description: input.siteDescription,
      social_links: input.socialLinks,
      featured_content: input.featuredContent || {},
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  return { data, error: null };
}
