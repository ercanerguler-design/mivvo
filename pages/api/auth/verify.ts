import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, email } = req.body;

    if (!token || !email) {
      return res.status(400).json({ error: 'Token ve email gerekli' });
    }

    // Token'ı bul
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!verificationToken) {
      return res.status(400).json({ error: 'Geçersiz veya süresi dolmuş token' });
    }

    // Token'ı doğrula
    const isValid = await bcrypt.compare(token, verificationToken.token);

    if (!isValid) {
      return res.status(400).json({ error: 'Geçersiz token' });
    }

    // Kullanıcıyı güncelle
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    // Kullanılan token'ı sil
    await prisma.verificationToken.delete({
      where: { identifier_token: { identifier: email, token: verificationToken.token } },
    });

    return res.status(200).json({ message: 'Email doğrulandı' });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Bir hata oluştu' });
  }
}