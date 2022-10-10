import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';
import NavBar from '../../components/navBar';
import StartupModal from '../../components/StartUpModal';
import Link from 'next/link';
import Image from 'next/image';
import useApi from '../../hooks/useApi';
import { StartUp } from '../../types';

const handleAuthRoute = () => {
  if (typeof window !== 'undefined') {
    window.location.assign('/api/auth/login');
  }
};

const Feed: NextPage = () => {
  const [showModal, setShowModal] = useState<string>();
  const [allStartups, setAllStartups] = useState<StartUp[]>();
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();
  const { user, error: userError, isLoading } = useUser();

  useEffect(() => {
    if (!user) return;
    setDataLoading(true);
    axios
      .get('/api/v1/all-startups')
      .then((res) => setAllStartups(res.data))
      .catch((err) => setError(err))
      .finally(() => setDataLoading(false));
  }, [user]);

  if (isLoading || dataLoading) return <div>Laden...</div>;
  if (error || userError) return <div>{error}</div>;

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
              userId={user.sub as string}
              allStartups={allStartups}
            />
          )}
          {allStartups && (
            <div className='flex flex-col items-center justify-center mt-8'>
              {allStartups.map((startup) => (
                <div key={startup.id} className='mb-5 w-64'>
                  {startup.imageId && (
                    <Image
                      src={startup.imageId}
                      alt={`${startup.title} thumbnail`}
                      width={100}
                      height={100}
                    />
                  )}
                  <h1>
                    <Link href={`/feed/${startup.title}`}>{startup.title}</Link>
                  </h1>
                  <span>{startup.content}</span>
                </div>
              ))}
            </div>
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
