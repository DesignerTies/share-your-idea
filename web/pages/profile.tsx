import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Role } from '../types';

function Profile() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [primaryUserRole, setPrimaryUserRole] = useState<Role | undefined>();

  useEffect(() => {
    if (user && user.email !== user.name) {
      const userId = user.sub;
      try {
      } catch (error) {
        setPrimaryUserRole(undefined);
      }
      axios
        .get(`/api/handleUserRole?userId=${userId}`)
        .then((response) => setPrimaryUserRole(response.data[0].name));
    }
  }, [user]);

  if (isLoading) return <div>Laden...</div>;

  if (user) {
    console.log(user);
    if (user.email !== user.name) {
      return primaryUserRole ? (
        <div className='flex h-52 flex-col'>
          <h1>{user.name}</h1>
          <h3>User role: {primaryUserRole}</h3>
          <a href='/api/auth/logout'>Log uit</a>
        </div>
      ) : (
        <div>Geen rol gevonden</div>
      );
    } else {
      router.push('/registration');
      return <div>Handeling route...</div>;
    }
  } else {
    router.push('/api/auth/login');
  }
}

export default Profile;
