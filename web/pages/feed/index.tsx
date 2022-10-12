import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Nav from '../../components/Nav';
import StartupModal from '../../components/StartUpModal';
import { StartUp } from '../../types';
import { useRouter } from 'next/router';
import useDBUser from '../../hooks/useDBUser';
import List from '../../components/List';

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
            <Nav clickAddIdea={() => setShowModal('show')} />
            {showModal && (
              <StartupModal
                clickModal={() => setShowModal(undefined)}
                userId={dbUser?.auth0Id as string}
                allStartups={allStartups}
              />
            )}
            {allStartups && <List startUps={allStartups} />}
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
