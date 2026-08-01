import { z } from "zod";

export const projectNarrativeSchema = z.object({
  challenge: z.string().optional(),
  idea: z.string().optional(),
  execution: z.string().optional(),
  outcome: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  client: z.string().min(2, "Client name is required"),
  year: z.number().int().min(2000).max(2100),
  category: z.enum(["ad-films", "product-videos", "instagram-reels"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  narrative: projectNarrativeSchema.optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  videoUrl: z.string().url("Video URL must be valid").or(z.literal("")).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export type ProjectInput = z.infer<typeof projectSchema>;
