"use server";

import { cmsEnabled, staticTestimonials } from "@/config/portfolio-content";
import { createClient } from "@/lib/supabase/server";
import { testimonialSchema, TestimonialInput } from "@/lib/validators/testimonial.schema";
import { revalidatePath } from "next/cache";

export async function getTestimonialsAction() {
  if (!cmsEnabled) {
    return { data: [...staticTestimonials], error: null };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data, error: null };
}

export async function createTestimonialAction(input: TestimonialInput) {
  const validation = testimonialSchema.safeParse(input);
  if (!validation.success) return { error: validation.error.format() };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .insert([
      {
        quote: input.quote,
        author: input.author,
        title: input.title,
        company: input.company,
        avatar_url: input.avatarUrl,
      },
    ])
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/dashboard/testimonials");
  return { data, error: null };
}

export async function updateTestimonialAction(id: string, input: Partial<TestimonialInput>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/dashboard/testimonials");
  return { data, error: null };
}

export async function deleteTestimonialAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/dashboard/testimonials");
  return { success: true };
}
