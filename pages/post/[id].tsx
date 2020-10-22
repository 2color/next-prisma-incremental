import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import styles from '../../styles/Main.module.css';
import { Post } from './../../data/posts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({
  params
}) => {
  const matchedPost = await prisma.post.findOne({
    where: {
      id: Number(params.id)
    }
  });
  return {
    props: {
      post: matchedPost
    }
  };
};

const deletePost = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'DELETE'
  });
  Router.push('/');
};

interface PostPageProps {
  post: Post;
}

const PostPage: React.FC<PostPageProps> = (props) => {
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
  );
};

export default PostPage;
