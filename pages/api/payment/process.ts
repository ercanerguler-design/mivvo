import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { planId, paymentMethod, amount, credits } = req.body;

    if (!planId || !amount || !credits) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Mock ödeme işlemi - gerçek uygulamada burada Stripe/PayTR entegrasyonu olacak
    const mockPaymentResult = await processMockPayment({
      planId,
      amount,
      paymentMethod,
      userEmail: session.user.email
    });

    if (!mockPaymentResult.success) {
      return res.status(400).json({ error: mockPaymentResult.error });
    }

    // Kullanıcının kredilerini güncelle
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Kredileri ekle
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        credits: user.credits + credits
      }
    });

    // Ödeme geçmişini kaydet (opsiyonel)
    await prisma.payment.create({
      data: {
        userId: user.id,
        planId,
        amount,
        credits,
        paymentMethod,
        status: 'completed',
        transactionId: mockPaymentResult.transactionId
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Ödeme başarılı',
      transactionId: mockPaymentResult.transactionId,
      newCredits: user.credits + credits
    });

  } catch (error) {
    console.error('Payment error:', error);
    return res.status(500).json({ error: 'Payment processing failed' });
  }
}

// Mock ödeme işlemi fonksiyonu
async function processMockPayment({
  planId,
  amount,
  paymentMethod,
  userEmail
}: {
  planId: string;
  amount: number;
  paymentMethod: string;
  userEmail: string;
}) {
  // Mock ödeme işlemi - her zaman başarılı
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    planId,
    paymentMethod
  };
}
