import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

export default withApiAuthRequired(async function (req: any, res: any) {
  if (req.method === 'POST') {
    const title = req.body.title;
    const content = req.body.content;
    const authorId = req.body.userId;
    if (req.body.imageId) {
      const imageId = req.body.imageId;
      const newIdea: object = await prisma.idea.create({
        data: {
          title: title,
          content: content,
          authorId: authorId,
          imageId,
        },
      });

      res.send(newIdea);
    } else {
      const newIdea: object = await prisma.idea.create({
        data: {
          title,
          content,
          authorId,
        },
      });

      res.send(newIdea);
    }
  }

  if (req.method === 'GET') {
    const title = req.query.title;

    const startUp = await prisma.idea.findUnique({
      where: {
        title,
      },
    });
    res.send(startUp);
  }
});
