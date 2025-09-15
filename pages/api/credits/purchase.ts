import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { amount, credits } = req.body;

    // Ödeme işlemi simülasyonu
    // Gerçek uygulamada burada Stripe veya PayTR entegrasyonu olacak
    const payment = await prisma.payment.create({
      data: {
        userId: (session as any).user.id,
        amount: parseFloat(amount),
        credits: parseInt(credits),
        provider: 'stripe',
        status: 'success',
      },
    });

    // Kullanıcının kredilerini güncelle
    const updatedUser = await prisma.user.update({
      where: { id: (session as any).user.id },
      data: {
        credits: {
          increment: parseInt(credits)
        }
      },
    });

    // Premium seviyesi için kredi kontrolü
    if (updatedUser.credits >= 100 && (updatedUser as any).role === 'FREE') {
      await prisma.user.update({
        where: { id: (session as any).user.id },
        data: { role: 'PREMIUM' } as any,
      });
    }

    return res.status(200).json({ 
      success: true,
      payment,
      credits: updatedUser.credits
    });
  } catch (error) {
    console.error('Payment error:', error);
    return res.status(500).json({ message: 'Payment processing failed' });
  }
}