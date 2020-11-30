import React, { useCallback, useState } from 'react'
import Loader from 'react-loader-spinner'
import styles from '../styles/Main.module.css'
import { Post, Comment } from '@prisma/client'
import Comments from './comments'
import Head from 'next/head'

type PostProps = {
  post: Post & {
    comments: Comment[] | null
  }
  onDeletePost: (id: number) => Promise<void>
  onSubmitComment: (postId: number, comment: string) => Promise<Comment>
}

const PostComponent: React.FC<PostProps> = ({
  post,
  onDeletePost,
  onSubmitComment,
}) => {
  const [isPostingComment, setPostingComment] = useState(false)
  const [comments, setComments] = useState(post.comments || [])
  const [comment, setComment] = useState('')
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if(comment.length === 0) return
      setPostingComment(true)
      const createdComment = await onSubmitComment(post.id, comment)
      setPostingComment(false)
      setComment('')
      setComments([...comments, createdComment])
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
      {comments?.length ? <Comments comments={comments} /> : null}
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
        <button disabled={comment.length === 0} className={styles.createButton} type="submit">
          <Loader
            visible={isPostingComment}
            type="Oval"
            color="white"
            height="15"
            width="15"
          />{' '}
          Submit
        </button>
      </form>
      <button
        className={styles.deleteButton}
        onClick={() => onDeletePost(post.id)}
      >
        Delete Post
      </button>
    </div>
  )
}

export default PostComponent
