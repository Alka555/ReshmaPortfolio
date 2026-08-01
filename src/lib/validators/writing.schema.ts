import { z } from "zod";

export const writingSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.enum(["blogs", "creative-writing", "scripts", "screenplays"]),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  thumbnail: z.string().url("Thumbnail must be a valid URL").or(z.literal("")).optional(),
  externalUrl: z.string().url("External URL must be valid").or(z.literal("")).optional(),
  content: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export type WritingInput = z.infer<typeof writingSchema>;
