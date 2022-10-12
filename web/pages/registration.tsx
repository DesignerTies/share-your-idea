import React, { useState, useRef } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import useDBUser from '../hooks/useDBUser';
import axios from 'axios';
import { Role } from '../types';

const formSubmit = async (nameVal: string, auth0UserId: string, role: Role) => {
  Promise.all([
    axios.put('/api/handleRegistration', {
      data: {
        userName: nameVal,
        auth0UserId,
        role,
      },
    }),
    axios.post('/api/v1/create-db-user', {
      data: {
        userName: nameVal,
        auth0UserId,
        role,
      },
    }),
  ])
    .then((values) => console.log(values))
    .catch((e) => console.log(e))
    .finally(() => window.location.assign('/'));
};

const Registration: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const { dbUser, isLoading: dbUserLoading } = useDBUser();
  const [role, setRole] = useState<Role>();
  const nameRef = useRef<HTMLInputElement>(null);
  const roleChange = useRef<HTMLSelectElement>(null);

  if (isLoading || dbUserLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  if (user) {
    if (!dbUser) {
      {
        console.log(dbUser);
      }
      return (
        <div>
          <form
            action=''
            onSubmit={(e) => {
              e.preventDefault();
              formSubmit(
                nameRef.current!.value,
                user.sub!,
                roleChange.current!.value as Role
              );
            }}
          >
            <input type='text' placeholder='name' ref={nameRef} />
            <select
              required
              ref={roleChange}
              onChange={() => setRole(roleChange.current!.value as Role)}
            >
              <option value='StartUp'>Start-Up</option>
              <option value='Investor'>Investor</option>
            </select>
            {role === 'Investor' && (
              <>
                <input type='text' placeholder='To invest' />
                <input type='text' placeholder='company' />
              </>
            )}
            <input type='submit' />
          </form>
        </div>
      );
    } else {
      window.location.assign('/profile');
      return <div>niks..</div>;
    }
  } else {
    window.location.assign('/');
    return <div>handeling route...</div>;
  }
};

export default Registration;
