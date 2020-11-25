import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const prisma = new PrismaClient()
    const body = JSON.parse(req.body)
    const comment = body.comment as string
    const postId = body.postId as number

    const createdComment = await prisma.comment.create({
      data: {
        comment,
        post: {
          connect: {
            id: postId,
          },
        },
      },
    })
    res.json(createdComment)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    )
  }
}
