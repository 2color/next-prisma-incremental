import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postId = req.query.id
  if (req.method === 'DELETE') {
    const prisma = new PrismaClient()
    await prisma.$transaction([
      prisma.comment.deleteMany({
        where: {
          postId: Number(postId),
        },
      }),
      prisma.post.delete({
        where: {
          id: Number(postId),
        },
      }),
    ])
    res.json({ message: `Post ${postId} deleted` })
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    )
  }
}
