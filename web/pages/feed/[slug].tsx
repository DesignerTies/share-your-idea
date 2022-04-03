import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps, NextPage } from 'next';
import prisma from '../../lib/prisma';

const FeedPost: NextPage = (props: any) => {
  return (
    <>
      {console.log(props)}
      <div>Hallo</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  returnTo: '/api/auth/login',

  async getServerSideProps({ params }: any) {
    const slug = params.slug;

    console.log(slug);

    const startUp = await prisma.idea.findUnique({
      where: {
        title: slug,
      },
    });

    return {
      props: {
        authorId: startUp?.authorId,
        content: startUp?.content,
        id: startUp?.id,
        imageId: startUp?.imageId,
        title: startUp?.title,
      },
    };
  },
});

export default FeedPost;
