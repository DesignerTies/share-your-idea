import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const auth0Id = req.query.id;

    if (!auth0Id) res.status(400).send('No user id was given');

    try {
      const user = await prisma.user.findUnique({
        where: {
          auth0Id: auth0Id as string,
        },
      });
      if (!user) res.status(404).send('user not found');
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(404).end();
    }
  }
};

export default handler;
