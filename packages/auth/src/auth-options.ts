import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma, User } from "@acme/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { GoogleProfile } from "./types";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: ["pkce", "state"],
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.username = (user as User).username;
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && !(user as User).username) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            username: profile?.email?.split("@")[0],
            emailVerified: (profile as GoogleProfile).email_verified
              ? new Date()
              : null,
          },
        });
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
};
