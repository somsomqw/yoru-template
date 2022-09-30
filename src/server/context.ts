import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import admin from "firebase-admin";
// import { authOptions } from "../pages/api/auth/[...nextauth]";
import { cert } from "firebase-admin/app";
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../guchirou-6a558-firebase-adminsdk-6b5dp-a9672f1892.json");

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you'd might want to do in your ctx fn
  // async function getUserFromHeader() {
  //   if (opts?.req.headers.authorization) {
  //     // const user = await decodeJwtToken(req.headers.authorization.split(' ')[1])
  //     // return user;
  //   }
  //   return null;
  // }
  // const user = await getUserFromHeader();
  const req = opts?.req;
  const res = opts?.res;
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();

  return {
    req,
    res,
    db,
  };
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
