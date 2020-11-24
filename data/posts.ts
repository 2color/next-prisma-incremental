export type Post = {
  id: number
  title: string
  excerpt: string
  comments?: string[]
}

export const posts: Post[] = [
  {
    id: 1,
    title: 'Prisma Simplifies Database Access',
    excerpt: "Let's take a look at how Prisma makes database access a breeze",
    comments: ['Interesting post', 'Such a breeze reminds me of the ocean'],
  },
  {
    id: 2,
    title: 'Next.js is the Best React Framework',
    excerpt: 'See how you can develop and ship faster with Next.js',
    comments: ['Love Next.js', 'Next.js reduced our development process by 50%!'],
  },
  {
    id: 3,
    title: 'How to Create Models with Prisma',
    excerpt: 'The Prisma Schema Language helps you easily shape your data',
    comments: ['Why is the Prisma schema necessary?', 'How do you define m-n relations?'],
  },
  {
    id: 4,
    title: 'Accessing Data in Next.js with Prisma',
    excerpt: 'Prisma is the perfect database companion for Next.js apps',
    comments: ['What is Prisma?', 'Does Prisma support PostgreSQL?'],
  },
]
