import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentId } = req.query;
  const { status } = req.body;

  if (!paymentId || typeof paymentId !== 'string') {
    return res.status(400).json({ error: 'Payment ID is required' });
  }

  if (!status || !['pending', 'completed', 'failed'].includes(status)) {
    return res.status(400).json({ error: 'Valid status is required' });
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { user: true }
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Ödeme durumunu güncelle
    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status }
    });

    // Eğer ödeme başarılı olarak işaretleniyorsa ve daha önce pending idi
    if (status === 'completed' && payment.status === 'pending') {
      // Kullanıcıya kredi ekle
      await prisma.user.update({
        where: { id: payment.userId },
        data: {
          credits: {
            increment: payment.credits
          }
        }
      });
    }

    // Eğer ödeme başarısız olarak işaretleniyorsa ve daha önce completed idi
    if (status === 'failed' && payment.status === 'completed') {
      // Kullanıcıdan kredi çıkar
      await prisma.user.update({
        where: { id: payment.userId },
        data: {
          credits: {
            decrement: payment.credits
          }
        }
      });
    }

    return res.status(200).json({ 
      message: 'Payment status updated successfully',
      payment: updatedPayment
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    return res.status(500).json({ error: 'Failed to update payment status' });
  }
}
