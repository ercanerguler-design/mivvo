import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { prisma } from "../../src/lib/prisma";
import auth from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const session = await getServerSession(req, res, (auth as any).authOptions || (auth as any).config);
  if(!session || !session.user){ return res.status(200).json({ credits: 0 }); }
  const dbUser = await prisma.user.findUnique({ where: { email: session.user.email||"" } });
  return res.status(200).json({ credits: dbUser?.credits ?? 0, user: { name: session.user.name, email: session.user.email } });
}
