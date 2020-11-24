import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { title } from 'process'
import { posts } from '../../data/posts'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient()
  await prisma.$transaction([
    prisma.comment.deleteMany({}),
    prisma.post.deleteMany({}),
  ])
  const promises = []
  for (const post of posts) {
    promises.push(
      prisma.post.create({
        data: {
          title: post.title,
          excerpt: post.excerpt,
          comments: {
            create: post.comments.map((comment) => ({ comment })),
          },
        },
      }),
    )
  }
  await Promise.all(promises)

  res.statusCode = 200
  res.json(posts)
}
