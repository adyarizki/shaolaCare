import NextAuth from "next-auth";
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { NextAuthOptions } from "next-auth";
// Import your providers here
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });

        const { email, password } = schema.parse(credentials);

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) throw new Error("No user found");
        if (!user.password) throw new Error("No password set for user");
        if (!user.verifiedAt) throw new Error("User not verified");
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid password");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // ✅ Tambahkan role ke JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    // ✅ Tambahkan role ke session.user
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };