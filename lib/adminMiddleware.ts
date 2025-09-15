import { NextApiRequest, NextApiResponse } from 'next';

export default function adminMiddleware(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Admin authentication kontrolü
    const adminAuth = req.headers.authorization;
    
    if (!adminAuth || adminAuth !== 'Bearer admin12345') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return handler(req, res);
  };
}
