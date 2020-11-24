import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Main.module.css'
import { Post } from './../data/posts'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// This function gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany()
  return {
    props: {
      posts,
    },
    // Revalidate will refetch at runtime
    revalidate: 30,
  }
}

interface HomeProps {
  posts: Post[]
}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Prisma Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Blog!</h1>

        <div className={styles.grid}>
          {props.posts.map((p: Post) => {
            return (
              <a className={styles.card}>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <div className="buttons">
                  <Link href={`/post_ssr/${p.id}`} key={p.id}>
                    <button>Open SSR</button>
                  </Link>
                  <Link href={`/post_inc/${p.id}`} key={p.id}>
                    <button>Open static</button>
                  </Link>
                </div>
              </a>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Home
