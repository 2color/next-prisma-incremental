export type Post = {
  id: number;
  title: string;
  excerpt: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: 'Prisma Simplifies Database Access',
    excerpt:
      "Let's take a look at how Prisma makes database access a breeze"
  },
  {
    id: 2,
    title: 'Next.js is the Best React Framework',
    excerpt:
      'See how you can develop and ship faster with Next.js'
  },
  {
    id: 3,
    title: 'How to Create Models with Prisma',
    excerpt:
      'The Prisma Schema Language helps you easily shape your data'
  },
  {
    id: 4,
    title: 'Accessing Data in Next.js with Prisma',
    excerpt:
      'Prisma is the perfect database companion for Next.js apps'
  }
];
