import { NextApiRequest, NextApiResponse } from 'next';
import { NHTSAApi } from '@/lib/nhtsaApi';
// If your 'nhtsaApi.ts' is actually in 'c:\Project\mivvo\lib\nhtsaApi.ts', use '../../../lib/nhtsaApi' as the path.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { vin } = req.query;

  if (!vin || typeof vin !== 'string') {
    return res.status(400).json({ error: 'VIN parameter is required' });
  }

  if (!NHTSAApi.validateVIN(vin)) {
    return res.status(400).json({ error: 'Invalid VIN format' });
  }

  try {
    const vehicleInfo = await NHTSAApi.decodeVIN(vin);
    
    if (!vehicleInfo) {
      return res.status(404).json({ error: 'Vehicle information not found' });
    }

    return res.status(200).json(vehicleInfo);
  } catch (error) {
    console.error('Error processing VIN request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}