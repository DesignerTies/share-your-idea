import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps, NextPage } from "next";

const FeedPost: NextPage = ({ id }: any) => {
  return <div>{id}</div>;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  returnTo: "/api/auth/login",

  async getServerSideProps({ params }: any) {
    const id = params.id;
    return {
      props: {
        id,
      },
    };
  },
});

export default FeedPost;
