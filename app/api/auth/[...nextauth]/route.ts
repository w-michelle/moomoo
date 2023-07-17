import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { prisma } from "@/util/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Stripe from "stripe";

import "next-auth";

declare module "next-auth" {
  interface User {
    id: string | undefined;
  }

  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "userame", type: "text" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],

  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-11-15",
      });
      //create a stripe customer
      const customer = await stripe.customers.create({
        email: user.email || undefined,
      });

      //update our prisma user with stripecustomer id
      await prisma.user.update({
        where: { id: user.id } || { email: user.email },
        data: { stripeCustomerId: customer.id },
      });
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = token.id?.toString();
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
