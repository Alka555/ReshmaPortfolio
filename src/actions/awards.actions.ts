"use server";

import { cmsEnabled, staticAwards } from "@/config/portfolio-content";
import { createClient } from "@/lib/supabase/server";
import { awardSchema, AwardInput } from "@/lib/validators/award.schema";
import { revalidatePath } from "next/cache";

export async function getAwardsAction() {
  if (!cmsEnabled) {
    return { data: [...staticAwards], error: null };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("awards")
    .select("*")
    .order("year", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data, error: null };
}

export async function createAwardAction(input: AwardInput) {
  const validation = awardSchema.safeParse(input);
  if (!validation.success) return { error: validation.error.format() };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("awards")
    .insert([
      {
        title: input.title,
        organization: input.organization,
        year: input.year,
        project_title: input.projectTitle,
        description: input.description,
      },
    ])
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/dashboard/awards");
  return { data, error: null };
}

export async function updateAwardAction(id: string, input: Partial<AwardInput>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("awards")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/dashboard/awards");
  return { data, error: null };
}

export async function deleteAwardAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("awards").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/dashboard/awards");
  return { success: true };
}
