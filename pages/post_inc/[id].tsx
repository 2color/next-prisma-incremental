import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import styles from '../../styles/Main.module.css'
import { Post } from '../../data/posts'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const posts = await prisma.post.findMany()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: String(post.id) },
  }))

  return { 
    paths, 
    // If an ID is requested that isn't defined here, fallback will incrementally generate the page
    fallback: true 
  }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const matchedPost = await prisma.post.findOne({
    where: {
      id: Number(params.id),
    },
  })
  return {
    props: {
      post: matchedPost,
    },
  }
}

interface PostPageProps {
  post: Post
}

const PostPage: React.FC<PostPageProps> = (props) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{props.post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{props.post.title}</h1>
      <p>{props.post.excerpt}</p>
      <button
        className={styles.deleteButton}
        onClick={() => deletePost(props.post.id)}
      >
        Delete Post
      </button>
    </div>
  )
}

export default PostPage

const deletePost = async (id: number): Promise<void> => {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.push('/')
}