import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { prisma } from "../../utils/prisma";
import { Prisma } from "@prisma/client";
import nodemailer from "nodemailer";
import {
  inputMailAuthentication,
  outputMailAuthentication,
} from "../../schema/mail.schema";

export const mailRouter = t.router({
  sendMailCode: t.procedure
    .input(inputMailAuthentication)
    .output(outputMailAuthentication)
    .mutation(async ({}) => {
      try {
        const authCode = Math.random().toString().substring(2, 8);
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "yorutemplate@gmail.com",
            pass: "qhslkszqikktaktu",
          },
        });
        const mailOptions = {
          from: "yorutemplate",
          to: "jyol1234@gmail.com",
          subject: "会員登録のための認証コード",
          html: `<div><p>こちらは会員登録のための認証コードになります。</p><p>認証コードを会員登録画面の入力欄に入力してください。</p><p style="font-weight: bold">${authCode}</p></div>`,
        };
        await transporter.sendMail(mailOptions);
        return { authCode };
      } catch (e) {
        throw e;
      }
    }),
});
