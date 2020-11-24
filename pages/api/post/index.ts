import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      const prisma = new PrismaClient();
    const post = await prisma.post.create({
      data: {
        title: `New Post ✍️`,
        excerpt: `This is a sample post (created: ${new Date().toUTCString()})`
      }
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
