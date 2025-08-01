// types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string; // tambahkan role
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string; // ditambahkan saat login sukses
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}
