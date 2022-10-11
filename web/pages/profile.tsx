import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Role } from '../types';
import useDBUser from '../hooks/useDBUser';

function Profile() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { dbUser, isError, isLoading: dbUserLoading } = useDBUser();

  if (isLoading || dbUserLoading) return <div>Laden...</div>;

  if (user) {
    if (dbUser) {
      return dbUser?.primaryRole ? (
        <div className='flex h-52 flex-col'>
          <h1>{user.name}</h1>
          <h3>User role: {dbUser.primaryRole}</h3>
          <a href='/api/auth/logout'>Log uit</a>
        </div>
      ) : (
        <div>Geen rol gevonden</div>
      );
    } else if (!dbUser && isError) {
      window.location.assign('/registration');
      return null;
    } else {
      return <div>Er is een error</div>;
    }
  } else {
    router.push('/api/auth/login');
    return null;
  }
}

export default Profile;
