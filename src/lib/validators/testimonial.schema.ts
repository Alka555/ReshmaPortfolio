import { z } from "zod";

export const testimonialSchema = z.object({
  quote: z.string().min(10, "Quote must be at least 10 characters"),
  author: z.string().min(2, "Author name is required"),
  title: z.string().min(2, "Author title is required"),
  company: z.string().optional(),
  avatarUrl: z.string().url("Avatar URL must be valid").or(z.literal("")).optional(),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
