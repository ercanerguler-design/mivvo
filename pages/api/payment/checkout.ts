import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import auth from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const session = await getServerSession(req, res, (auth as any).authOptions || (auth as any).config);
  if(!session || !session.user?.email) return res.status(401).json({ error: "Giriş gerekli" });

  const { provider } = req.body || {};
  // DEMO: gerçek ödeme yerine direkt başarı say
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if(!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

  await prisma.user.update({ where: { id: user.id }, data: { credits: { increment: 2 } } });
  await prisma.payment.create({ data: { userId: user.id, provider: provider || "demo", amount: 700, credits: 2 } });

  return res.status(200).json({ ok: true, message: "Ödeme başarı (demo). 2 kredi yüklendi." });
}
