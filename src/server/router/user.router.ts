import { t } from "../trpc";
import { z } from "zod";
import trpc from "@trpc/server";
import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../guchirou-6a558-firebase-adminsdk-6b5dp-a9672f1892.json");

export const userRouter = t.router({
  regist: t.procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (admin.apps.length === 0) {
          admin.initializeApp({
            credential: cert(serviceAccount),
          });
        }
        const db = getFirestore();
        const COLLECTION_NAME = "users";
        const docRef = await db.collection(COLLECTION_NAME).doc();
        const insertData = {
          email: input.email,
          password: input.password,
        };
        const res = await docRef.set(insertData);
      } catch (e: any) {
        throw new trpc.TRPCError(e);
      }
    }),
});
