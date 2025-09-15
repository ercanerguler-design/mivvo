import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;
  const { credits } = req.body;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'User ID is required' });
  }

  if (!credits || typeof credits !== 'number' || credits <= 0) {
    return res.status(400).json({ error: 'Valid credits amount is required' });
  }

  try {
    // Kullanıcının mevcut kredilerini al ve yeni kredileri ekle
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: credits
        }
      }
    });

    return res.status(200).json({ 
      message: 'Credits added successfully',
      newCredits: updatedUser.credits
    });
  } catch (error) {
    console.error('Add credits error:', error);
    return res.status(500).json({ error: 'Failed to add credits' });
  }
}
