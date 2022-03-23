import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

export default (async function (req: any, res: any) {
  if (req.method === 'POST') {
    const title = req.body.title;
    const content = req.body.content;
    const authorId = req.body.userId;
    if (req.body.imageId) {
      const imageId = req.body.imageId;
    }

    try {
      const newIdea: object = await prisma.idea.create({
        data: {
          title: title,
          content: content,
          authorId: authorId,
        },
      });
      res.send(newIdea);
    } catch (error) {
      res.send(error);
    }
  }
});
