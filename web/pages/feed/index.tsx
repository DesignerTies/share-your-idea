import NavBar from "./../../components/navBar";
import { NextPage } from "next";
import { UserContext, useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";

const handleAuthRoute = () => {
  if (typeof window !== "undefined") {
    window.location.assign("/api/auth/login");
  }
};

const Feed: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Laden...</div>;
  if (error) return <div>{error}</div>;

  if (user) {
    return (
      <>
        <Head>
          <title>Feed</title>
          <meta charSet='utf-8' />
        </Head>
        <div>
          <NavBar userName={user.nickname!} userPicture={user.picture!} />
        </div>
      </>
    );
  } else {
    handleAuthRoute();
    return <div>Niet ingelogd...</div>;
  }
};

export default Feed;