import z, { number } from "zod";

export const inputRegistCampaignSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
});
