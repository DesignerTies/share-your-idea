import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import axios from 'axios';

const handleAuthRoute = () => {
  if (typeof window !== 'undefined') {
    window.location.assign('/api/auth/login');
  }
};

const handleRegistrationRoute = () => {
  if (typeof window !== 'undefined') {
    window.location.assign('/registration');
  }
};

function Profile() {
  const { user, isLoading } = useUser();
  const [primaryUserRole, setPrimaryUserRole] = useState('');

  useEffect(() => {
    if (user) {
      const userId = user.sub;
      axios
        .get(`/api/handleUserRole?userId=${userId}`)
        .then((response) => setPrimaryUserRole(response.data[0].name));
    }
  }, [user]);

  if (isLoading) return <div>Laden...</div>;

  if (user) {
    console.log(user);
    if (user.email !== user.name) {
      return primaryUserRole !== '' ? (
        <div className='flex h-52 flex-col'>
          <h1>{user.name}</h1>
          <h3>User role: {primaryUserRole}</h3>
          <a href='/api/auth/logout'>Log uit</a>
        </div>
      ) : (
        <div>Laden...</div>
      );
    } else {
      handleRegistrationRoute();
      return <div>Handeling route...</div>;
    }
  } else {
    handleAuthRoute();
  }
}

export default Profile;
