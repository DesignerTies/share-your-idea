import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default withApiAuthRequired(async function (
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const response = {
    hallo: 'test',
  };

  res.json(JSON.stringify(response));
});
