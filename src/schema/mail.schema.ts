import z from "zod";

export const inputMailAuthentication = z.object({
  email: z.string(),
});

export const outputMailAuthentication = z.object({
  authCode: z.string(),
});
