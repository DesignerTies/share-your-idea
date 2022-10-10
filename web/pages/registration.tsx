import { HandlerError, useUser } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Role } from '../types';

const formSubmit = (nameVal: string, userId: string) => {
  axios
    .put('/api/handleRegistration', {
      data: {
        userName: nameVal,
        userId: userId,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        window.location.assign('/');
      }
    })
    .catch((err) => console.log(err));
};

const Registration: NextPage = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [role, setRole] = useState<Role>();
  const nameRef = useRef<HTMLInputElement>(null);
  const roleChange = useRef<HTMLSelectElement>(null);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  if (user) {
    if (user.email === user.name) {
      return (
        <div>
          <form
            action=''
            onSubmit={(e) => {
              e.preventDefault();
              formSubmit(nameRef.current!.value, user.sub!);
            }}
          >
            <input type='text' placeholder='name' ref={nameRef} />
            <select
              id=''
              ref={roleChange}
              onChange={() => setRole(roleChange.current!.value as Role)}
            >
              <option value='Start-Up'>Start-Up</option>
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
    router.push('/');
    return <div>handeling route...</div>;
  }
};

export default Registration;
