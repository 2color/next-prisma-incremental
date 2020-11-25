import React, { useCallback, useState } from 'react'
import styles from '../styles/Main.module.css'
import { Post, Comment } from '@prisma/client'
import Comments from './comments'
import Head from 'next/head'

type PostProps = {
  post: Post & {
    comments: Comment[]
  }
  onDeletePost: (id: number) => Promise<void>
  onSubmitComment: (postId: number, comment: string) => Promise<void>
}

const PostComponent: React.FC<PostProps> = ({
  post,
  onDeletePost,
  onSubmitComment,
}) => {
  const [comment, setComment] = useState('')
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      onSubmitComment(post.id, comment)
    },
    [onSubmitComment, comment],
  )
  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      {post.comments.length ? <Comments comments={post.comments} /> : null}
      <form className={styles.commentForm} onSubmit={onSubmit}>
        <input
          id="comment"
          type="comment"
          aria-label=""
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => {
            console.log(e.target.value)
            setComment(e.target.value) 
          }}
        />
        <button className={styles.navigationButton} type="submit">
          Submit
        </button>
      </form>
      {/* <button
        className={styles.deleteButton}
        onClick={() => onDeletePost(post.id)}
      >
        Delete Post
      </button> */}
    </div>
  )
}

export default PostComponent
