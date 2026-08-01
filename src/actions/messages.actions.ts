"use server";

import { cmsEnabled } from "@/config/portfolio-content";
import { createClient } from "@/lib/supabase/server";
import { contactMessageSchema, ContactMessageInput } from "@/lib/validators/contact.schema";
import { revalidatePath } from "next/cache";

export async function createMessageAction(input: ContactMessageInput) {
  const validation = contactMessageSchema.safeParse(input);
  if (!validation.success) {
    return { error: "Invalid form input. Please check your details." };
  }

  if (!cmsEnabled) {
    console.info("[createMessageAction] CMS disabled — message logged:", input);
    return { success: true, data: { id: "local", ...input } };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        name: input.name,
        email: input.email,
        message: input.message,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("[createMessageAction] Database Error:", error);
    return { error: "Failed to submit your message. Please try again." };
  }

  revalidatePath("/admin/dashboard/messages");
  return { success: true, data };
}

export async function getMessagesAction() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data, error: null };
}

export async function archiveMessageAction(id: string, isArchived: boolean) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .update({ is_archived: isArchived })
    .eq("id", id)
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/dashboard/messages");
  return { data, error: null };
}

export async function deleteMessageAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/dashboard/messages");
  return { success: true };
}
