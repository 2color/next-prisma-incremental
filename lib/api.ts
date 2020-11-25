import Router from 'next/router'
import { Comment } from '@prisma/client'

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

export const submitComment = async (
  postId: number,
  comment: string,
): Promise<Comment> => {
  const response = await fetch(`/api/comment`, {
    method: 'POST',
    body: JSON.stringify({ postId, comment }),
  })
  const responseBody = await response.json()
  return responseBody
}
