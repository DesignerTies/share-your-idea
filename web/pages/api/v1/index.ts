import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default withApiAuthRequired(async function (req: any, res: any) {
  const response = {
    hallo: 'test',
  };

  res.json(JSON.stringify(response));
});
