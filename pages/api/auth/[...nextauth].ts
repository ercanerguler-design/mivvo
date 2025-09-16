import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email ve şifre gerekli');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Kullanıcı bulunamadı');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Yanlış şifre');
        }

        if (!user.emailVerified) {
          throw new Error('Email adresinizi doğrulamanız gerekiyor');
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Get fresh user data on each request
        const user = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { 
            id: true,
            email: true,
            name: true,
            credits: true,
            image: true
          }
        });
        
        if (user) {
          session.user = {
            ...session.user,
            ...user
          };
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || (() => {
    if (process.env.NODE_ENV === 'production') {
      // Production için güçlü bir fallback secret
      return 'mivvo-prod-ultra-secure-2025-6N_YlPjj5eSbRzhiU68DVA8QrPfOanWeo_O5QrfrNco';
    }
    return 'dev-secret-key-mivvo-2025';
  })(),
};

export default NextAuth(authOptions);
