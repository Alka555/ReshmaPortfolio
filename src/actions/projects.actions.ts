"use server";

import { cmsEnabled, staticProjects } from "@/config/portfolio-content";
import { createClient } from "@/lib/supabase/server";
import { projectSchema, ProjectInput } from "@/lib/validators/project.schema";
import { revalidatePath } from "next/cache";

export async function getProjectsAction(options?: {
  category?: string;
  featured?: boolean;
  publishedOnly?: boolean;
}) {
  if (!cmsEnabled) {
    let data = [...staticProjects];
    if (options?.category && options.category !== "all") {
      data = data.filter((p) => p.category_slug === options.category);
    }
    if (options?.featured) {
      data = data.filter((p) => p.featured);
    }
    if (options?.publishedOnly !== false) {
      data = data.filter((p) => p.published);
    }
    return { data, error: null };
  }

  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select("*, project_media(*)")
    .order("year", { ascending: false });

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
    console.error("[getProjectsAction] Error:", error);
    return { data: [], error: error.message };
  }

  return { data, error: null };
}

export async function getProjectBySlugAction(slug: string) {
  if (!cmsEnabled) {
    const project = staticProjects.find((p) => p.slug === slug) ?? null;
    return { data: project, error: project ? null : "Not found" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*, project_media(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createProjectAction(input: ProjectInput) {
  const validation = projectSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.format() };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        title: input.title,
        slug: input.slug,
        client: input.client,
        year: input.year,
        category_slug: input.category,
        description: input.description,
        challenge: input.narrative?.challenge,
        idea: input.narrative?.idea,
        execution: input.narrative?.execution,
        outcome: input.narrative?.outcome,
        thumbnail: input.thumbnail,
        video_url: input.videoUrl,
        featured: input.featured,
        published: input.published,
      },
    ])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/dashboard/projects");
  return { data, error: null };
}

export async function updateProjectAction(id: string, input: Partial<ProjectInput>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${data.slug}`);
  revalidatePath("/admin/dashboard/projects");
  return { data, error: null };
}

export async function deleteProjectAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/dashboard/projects");
  return { success: true };
}

export async function toggleFeatureProjectAction(id: string, currentFeatured: boolean) {
  return updateProjectAction(id, { featured: !currentFeatured });
}
