import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps, NextPage } from 'next';
import prisma from '../../../lib/prisma';
import Head from 'next/head';
import Image from 'next/image';

interface Props {
  authorId: string;
  content: string;
  id: string;
  imageId: string;
  title: string;
  error?: string;
}

const FeedPost: NextPage<Props> = (props) => {
  return props.authorId ? (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div>
        <h1>{props.title}</h1>
        <p className='whitespace-pre-line'>{props.content}</p>
        {props.imageId && (
          <Image
            src={props.imageId}
            height={300}
            width={300}
            alt={'Thumbnail of ' + props.title + ' startup'}
          />
        )}
      </div>
    </>
  ) : (
    <div>{props.error}</div>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  returnTo: '/api/auth/login',

  async getServerSideProps({ params }: any) {
    const id = params.id;

    const startUp = await prisma.idea.findUnique({
      where: {
        id,
      },
    });

    return {
      props: startUp
        ? {
            authorId: startUp.authorId,
            content: startUp.content,
            id: startUp.id,
            imageId: startUp.imageId,
            title: startUp.title,
          }
        : {
            error: 'Deze startup bestaat niet...',
          },
    };
  },
});

export default FeedPost;
