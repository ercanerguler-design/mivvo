import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "../../lib/prisma";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const session = await getServerSession(req, res, authOptions);
  if(!session || !(session as any).user){ return res.status(200).json({ credits: 0 }); }
  const dbUser = await prisma.user.findUnique({ where: { email: (session as any).user.email||"" } });
  return res.status(200).json({ 
    credits: dbUser?.credits ?? 0, 
    user: { 
      name: dbUser?.name, 
      email: dbUser?.email,
      credits: dbUser?.credits,
      image: dbUser?.image,
      createdAt: dbUser?.createdAt
    } 
  });
}
