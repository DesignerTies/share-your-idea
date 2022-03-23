import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

export default (async function (req: any, res: any) {
  if (req.method === 'GET') {
    const allStartUps: object = await prisma.idea.findMany();
    res.json(allStartUps);
  }
});
