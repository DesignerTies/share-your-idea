import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps, NextPage } from 'next';
import prisma from '../../lib/prisma';
import Image from 'next/image';

const FeedPost: NextPage = (props: any) => {
  return props.authorId ? (
    <>
      <div>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
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
    const slug = params.slug;

    const startUp = await prisma.idea.findMany({
      where: {
        title: {
          contains: slug,
          mode: 'insensitive',
        },
      },
    });

    return {
      props:
        startUp.length !== 0
          ? {
              authorId: startUp[0]?.authorId,
              content: startUp[0]?.content,
              id: startUp[0]?.id,
              imageId: startUp[0]?.imageId,
              title: startUp[0]?.title,
            }
          : {
              error: 'Deze startup bestaat niet...',
            },
    };
  },
});

export default FeedPost;
