import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  return next();
});

export const authRouter = t.router({
  // getSession: t.procedure.query(({ ctx }) => ctx.session),
});
