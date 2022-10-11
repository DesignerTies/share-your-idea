import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import StartupModal from '../../components/StartUpModal';
import Link from 'next/link';
import Image from 'next/image';
import { StartUp } from '../../types';
import { useRouter } from 'next/router';
import truncateString from '../../utils/truncate';
import useDBUser from '../../hooks/useDBUser';

const Feed: NextPage = () => {
  const [showModal, setShowModal] = useState<string>();
  const [allStartups, setAllStartups] = useState<StartUp[]>();
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();
  const { user, error: userError, isLoading } = useUser();
  const { dbUser, isError, isLoading: dbUserLoading } = useDBUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !dbUser) return;
    setDataLoading(true);
    axios
      .get('/api/v1/all-startups')
      .then((res) => setAllStartups(res.data))
      .catch((err) => {
        setError(err);
      })
      .finally(() => setDataLoading(false));
  }, [user, dbUser]);

  if (isLoading || dataLoading || dbUserLoading) return <div>Laden...</div>;
  if (error || userError || (isError && !dbUser))
    return <div>Er is een error</div>;

  if (user) {
    if (dbUser) {
      return (
        <>
          <Head>
            <title>Feed</title>
            <meta charSet='utf-8' />
          </Head>
          <div>
            {/* clickAddIdea is a custom prop you can pass to click the 'add idea' button */}
            <NavBar
              userName={dbUser?.username as string}
              userPicture={dbUser?.picture as string}
              clickAddIdea={() => setShowModal('show')}
            />
            {showModal && (
              <StartupModal
                clickModal={() => setShowModal(undefined)}
                userId={dbUser?.auth0Id as string}
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
                      <Link href={`/feed/idea/${startup.id}`}>
                        {startup.title}
                      </Link>
                    </h1>
                    <span className='whitespace-pre-line'>
                      {truncateString(startup.content, 300)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      );
    } else return null;
  } else {
    router.push('/api/auth/login');
    return <div>Niet ingelogd...</div>;
  }
};

export default Feed;
