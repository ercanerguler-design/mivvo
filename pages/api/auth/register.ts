import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ error: 'Tüm alanlar zorunludur' });
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Geçersiz email formatı' });
    }

    // Şifre uzunluğunu kontrol et
    if (password.length < 6) {
      return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır' });
    }

    // Email adresi kullanılıyor mu kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Bu email adresi zaten kullanılıyor' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 12);

    // Kullanıcıyı oluştur ve direkt aktif yap
    const user = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        hashedPassword,
        emailVerified: new Date(), // Direkt olarak doğrulanmış olarak işaretle
        credits: 2, // Başlangıç kredisi
      },
    });

    return res.status(200).json({ message: 'Kayıt başarılı' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Bir hata oluştu' });
  }
}