import { z } from "zod";

export const awardSchema = z.object({
  title: z.string().min(2, "Award title is required"),
  organization: z.string().min(2, "Organization is required"),
  year: z.number().int().min(2000).max(2100),
  projectTitle: z.string().optional(),
  description: z.string().optional(),
});

export type AwardInput = z.infer<typeof awardSchema>;
