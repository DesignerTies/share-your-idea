import NavBar from './../../components/navBar';
import { GetServerSideProps, NextPage } from 'next';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import StartupModal from '../../components/startup-modal';
import axios from 'axios';
import { start } from 'repl';

const handleAuthRoute = () => {
  if (typeof window !== 'undefined') {
    window.location.assign('/api/auth/login');
  }
};

const Feed: NextPage = (params) => {
  const { user, error, isLoading } = useUser();
  const [showModal, setShowModal] = useState<string>();
  const [allStartups, setAllStartUps] = useState<object>();

  useEffect(async () => {
    if (user) {
      const response = await axios.get('/api/v1/all-startups');
      setAllStartUps(response.data);
    }
  });

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
          {allStartups && (
            <>
              {allStartups.map((startup) => (
                <div key={startup.id}>
                  <h3>{startup.title}</h3>
                  <span>{startup.content}</span>
                </div>
              ))}
            </>
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
