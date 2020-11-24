import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import styles from '../../styles/Main.module.css'
import { PrismaClient, Post, Comment } from '@prisma/client'
import { Fragment } from 'react'

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const matchedPost = await prisma.post.findOne({
    where: {
      id: Number(params.id),
    },
    include: {
      comments: true,
    },
  })
  return {
    props: {
      post: matchedPost,
    },
  }
}

interface PostPageProps {
  post: Post & {
    comments: Comment[]
  }
}

const PostPage: React.FC<PostPageProps> = (props) => {
  const comments = props.post.comments
  return (
    <div className={styles.container}>
      <Head>
        <title>{props.post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{props.post.title}</h1>
      <p>{props.post.excerpt}</p>
      {comments.length && <Comments comments={comments} />}
      <button
        className={styles.deleteButton}
        onClick={() => deletePost(props.post.id)}
      >
        Delete Post
      </button>
    </div>
  )
}

interface CommentsProps {
  comments: Comment[]
}

const Comments: React.FC<CommentsProps> = (props) => {
  return (
    <div className={styles.comments}>
      <h2>Comments</h2>
      {props.comments.map((comment) => (
        <p>{comment.comment}</p>
      ))}
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
