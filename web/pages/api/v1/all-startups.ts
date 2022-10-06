import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const allStartUps: object = await prisma.idea.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    res.json(JSON.stringify(allStartUps));
  }
});
