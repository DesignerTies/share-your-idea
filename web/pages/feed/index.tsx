import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect, useContext } from 'react';
import Nav from '../../components/Nav';
import StartupModal from '../../components/StartUpModal';
import { StartUp } from '../../types';
import { useRouter } from 'next/router';
import useDBUser from '../../hooks/useDBUser';
import List from '../../components/List';
import DBUserContext from '../../context/DBUserContext';

const Feed: NextPage = () => {
  const [showModal, setShowModal] = useState<string>();
  const [allStartups, setAllStartups] = useState<StartUp[]>();
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();
  const { user, error: userError, isLoading } = useUser();
  const DBUser = useContext(DBUserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || !DBUser) return;
    setDataLoading(true);
    axios
      .get('/api/v1/all-startups')
      .then((res) => setAllStartups(res.data))
      .catch((err) => {
        setError(err);
      })
      .finally(() => setDataLoading(false));
  }, [user, DBUser]);

  if (isLoading || dataLoading) return <div>Laden...</div>;
  if (error || userError) return <div>Er is een error</div>;

  if (user) {
    if (DBUser) {
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
                userId={DBUser?.auth0Id as string}
                allStartups={allStartups}
              />
            )}
            {allStartups?.length !== 0 ? (
              <List startUps={allStartups as StartUp[]} />
            ) : (
              <p className='text-center my-7'>Geen startups gevonden...</p>
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
