import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma"; // dikkat: pages/api altında olduğun için 3 üst klasöre çıkman gerekebilir

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "database", // kredileri DB üzerinden bağlayacağız
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // özel giriş sayfan olacaksa buraya yönlendirir
  },
});
