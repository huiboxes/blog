import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const subscriberCount = await prisma.subscribes.count();

      return res.status(200).json({ subscriberCount: subscriberCount });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
