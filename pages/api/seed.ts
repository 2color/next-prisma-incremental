import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { title } from 'process'
import { posts } from '../../data/posts'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const promises = []
  for (const post of posts) {
    promises.push(
      prisma.post.create({
        data: {
          title: post.title,
          excerpt: post.excerpt,
        },
      }),
    )
  }
  await Promise.all(promises)

  res.statusCode = 200
  res.json(posts)
}
