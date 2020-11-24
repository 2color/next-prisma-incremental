import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Loader from 'react-loader-spinner'
import styles from '../styles/Main.module.css'
import { Post } from './../data/posts'
import { PrismaClient } from '@prisma/client'
import Router from 'next/router'
import { useState } from 'react'

const prisma = new PrismaClient()

// This function gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'desc',
    },
  })
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 5,
  }
}

interface HomeProps {
  posts: Post[]
}

const Home: React.FC<HomeProps> = (props) => {
  const [isLoading, setLoading] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>Prisma Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Blog!</h1>
        <div className={styles.buttons}>
          <button
            className={styles.createButton}
            onClick={() => {
              createPost(setLoading)
            }}
          >
            {
              <Loader
                visible={isLoading}
                type="Oval"
                color="white"
                height="15"
                width="15"
              />
            }{' '}
            Create Post
          </button>
          <button
            className={styles.createButton}
            onClick={() => {
              Router.reload()
            }}
          >
            Reload
          </button>
          <button className={styles.createButton} onClick={resetPosts}>
            Reset Posts
          </button>
        </div>
        <div className={styles.grid}>
          {props.posts.map((p: Post) => {
            return (
              <a className={styles.card}>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <div className="buttons">
                  <Link href={`/post_ssr/${p.id}`} key={p.id}>
                    <button className={styles.navigationButton}>
                      Open SSR
                    </button>
                  </Link>
                  <Link href={`/post_inc/${p.id}`} key={p.id}>
                    <button className={styles.navigationButton}>
                      Open static
                    </button>
                  </Link>

                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      deletePost(p.id)
                    }}
                  >
                    Delete Post
                  </button>
                </div>
              </a>
            )
          })}
        </div>
      </main>
    </div>
  )
}
const createPost = async (setLoading): Promise<void> => {
  setLoading(true)
  await fetch(`/api/post`, {
    method: 'POST',
  })
  setLoading(false)
}

const resetPosts = async (): Promise<void> => {
  await fetch(`/api/seed`, {
    method: 'POST',
  })
  Router.reload()
}

const deletePost = async (id: number): Promise<void> => {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.reload()
}

export default Home
