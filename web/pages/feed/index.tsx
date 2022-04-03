import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';
import NavBar from './../../components/navBar';
import StartupModal from '../../components/startup-modal';
import Link from 'next/link';

const handleAuthRoute = () => {
  if (typeof window !== 'undefined') {
    window.location.assign('/api/auth/login');
  }
};

const Feed: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [showModal, setShowModal] = useState<string>();
  const [allStartups, setAllStartUps] = useState<any[]>();

  useEffect(() => {
    if (user) {
      if (!allStartups) {
        axios.get('/api/v1/all-startups').then((response) => {
          setAllStartUps(response.data);
          console.log(response.data);
        });
      } else {
        return;
      }
    }
  }, [user, allStartups]);

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
              allStartups={allStartups}
            />
          )}
          {allStartups && (
            <>
              {allStartups.map((startup) => (
                <div key={startup.id}>
                  <Link href={`/feed/${startup.title}`}>
                    <h1 className='hover:cursor-pointer'>{startup.title}</h1>
                  </Link>
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
