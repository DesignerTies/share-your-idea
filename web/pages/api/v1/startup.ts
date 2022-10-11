import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const title = req.body.title;
    const content = req.body.content;
    const auth0Id = req.body.userId;

    try {
      const author = await prisma.user.findUnique({
        where: {
          auth0Id,
        },
      });
      if (author) {
        if (req.body.imageId) {
          const imageId = req.body.imageId;
          const newIdea: object = await prisma.idea.create({
            data: {
              title: title,
              content: content,
              imageId,
              authorId: author.id,
            },
          });
          res.send(newIdea);
        } else {
          const newIdea: object = await prisma.idea.create({
            data: {
              title,
              content,
              authorId: author.id,
            },
          });
          res.send(newIdea);
        }
      }
    } catch (error) {
      res.send(error);
    }
  }

  if (req.method === 'GET') {
    const id = req.query.id as string;

    const startUp = await prisma.idea.findUnique({
      where: {
        id,
      },
    });
    res.send(startUp);
  }
});
