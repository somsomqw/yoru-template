import { t } from "../trpc";
import { authRouter } from "./auth.router";
import { categoryRouter } from "./category.router";
import { userRouter } from "./user.router";

export const appRouter = t.router({
  user: userRouter,
  auth: authRouter,
  category: categoryRouter,
});
