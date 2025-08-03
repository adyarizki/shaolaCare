import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });

        try {
          const { email, password } = schema.parse(credentials);

          const user = await prisma.user.findUnique({ where: { email } });

          if (!user || !user.password || !user.verifiedAt) {
            return null;
          }
          
          const valid = await bcrypt.compare(password, user.password);
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
     session: async ({ session, token }) => {
      // Transfer token data to session
      if (token && session.user) {
        session.user.id = token.sub as string; // or token.id
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};