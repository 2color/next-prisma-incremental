import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Loader from 'react-loader-spinner'
import styles from '../styles/Main.module.css'
import { PrismaClient, Post } from '@prisma/client'
import Router from 'next/router'
import { useCallback, useState } from 'react'
import { createPost, deletePost, resetPosts } from '../lib/api'

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
    revalidate: 1,
  }
}

interface HomeProps {
  posts: Post[]
}

const Home: React.FC<HomeProps> = (props) => {
  const [isLoadingPost, setLoadingPost] = useState(false)
  const [isLoadingReset, setLoadingReset] = useState(false)

  const onCreatePost = useCallback(async () => {
    setLoadingPost(true)
    await createPost()
    setLoadingPost(false)
  }, [setLoadingPost])

  const onResetPosts = useCallback(async () => {
    setLoadingReset(true)
    await resetPosts()
    setLoadingReset(false)
  }, [setLoadingReset])

  return (
    <div className={styles.container}>
      <Head>
        <title>Prisma Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Blog!</h1>
        <div className={styles.buttons}>
          <button className={styles.createButton} onClick={onCreatePost}>
            {
              <Loader
                visible={isLoadingPost}
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
          <button className={styles.createButton} onClick={onResetPosts}>
            {
              <Loader
                visible={isLoadingReset}
                type="Oval"
                color="white"
                height="15"
                width="15"
              />
            }{' '}
            Reset Posts
          </button>
        </div>
        <div className={styles.grid}>
          {props.posts.map((p: Post) => {
            return (
              <a key={p.id} className={styles.card}>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <div className={styles.buttons}>
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

                  {/* <button
                    className={styles.deleteButton}
                    onClick={() => {
                      deletePost(p.id)
                    }}
                  >
                    Delete Post
                  </button> */}
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
