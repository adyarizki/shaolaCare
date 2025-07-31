import { PrismaClient } from "@/app/generated/prisma";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return Response.json({ message: "User not found" }, { status: 404 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await prisma.otp.create({
    data: {
      code: otp,
      expiry,
      userId: user.id,
    },
  });

  // send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
  from: process.env.EMAIL_FROM,
  to: email,
  subject: "Verify your email -Your OTP Code",
  text: `Your OTP is ${otp}. It will expire in 5 minutes.`, // fallback jika HTML gagal
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <h2 style="color: #333;">Verify your email</h2>
      <p>Halo,</p>
      <p>We have received a request to verify your email address. Here is your OTP code:</p>

      <div style="
        background-color: #e0f2fe;
        color: #0c4a6e;
        font-size: 24px;
        font-weight: bold;
        padding: 15px 20px;
        border-radius: 8px;
        display: inline-block;
        margin: 20px 0;
        letter-spacing: 4px;
        text-align: center;
      ">
        ${otp}
      </div>

      <p>This code will expire in <strong>5 Minute</strong>.</p>
      <p>If you did not request this code, please ignore this email.</p>

      <p style="margin-top: 30px; font-size: 12px; color: #777;">This email was sent automatically. Please do not reply.</p>
    </div>
  `,
});

  return Response.json({ message: "OTP sent" });
}