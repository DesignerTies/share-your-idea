import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps, NextPage } from 'next';

const FeedPost: NextPage = ({ slug }: any) => {
  return <div>{slug}</div>;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  returnTo: '/api/auth/login',

  async getServerSideProps({ params }: any) {
    const slug = params.slug;
    return {
      props: {
        slug,
      },
    };
  },
});

export default FeedPost;
