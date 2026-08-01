import { z } from "zod";

export const settingsSchema = z.object({
  siteTitle: z.string().min(2, "Site title is required"),
  siteDescription: z.string().min(10, "Site description is required"),
  socialLinks: z.object({
    instagram: z.string().optional(),
    // youtube: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
  }),
  featuredContent: z.object({
    featuredProjectIds: z.array(z.string()).optional(),
    featuredWritingIds: z.array(z.string()).optional(),
  }).optional(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
