import NavBar from './../../components/navBar';
import { NextPage } from 'next';
import { UserContext, useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { useState } from 'react';
import StartupModal from '../../components/startup-modal';

const handleAuthRoute = () => {
  if (typeof window !== 'undefined') {
    window.location.assign('/api/auth/login');
  }
};

const Feed: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [showModal, setShowModal] = useState<string>();

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
          {/* clickAddIdea is a custom prop you can pass to click the 'add idea' button */}
          <NavBar
            userName={user.nickname!}
            userPicture={user.picture!}
            clickAddIdea={() => setShowModal('show')}
          />
          {showModal && (
            <StartupModal
              clickModal={() => setShowModal(undefined)}
              userId={user.sub}
            />
          )}
        </div>
      </>
    );
  } else {
    handleAuthRoute();
    return <div>Niet ingelogd...</div>;
  }
};

export default Feed;
