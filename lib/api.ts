import Router from 'next/router'

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

export const submitComment = async (
  postId: number,
  comment: string,
): Promise<void> => {
  await fetch(`/api/comment`, {
    method: 'POST',
    body: JSON.stringify({ postId, comment }),
  })
}
