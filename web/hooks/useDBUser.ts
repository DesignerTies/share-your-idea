import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';
import axios from 'axios';

const useDBUser = () => {
  const { user } = useUser();
  const [dbUser, setDBUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      axios
        .get(`/api/v1/user?id=${user?.sub}`)
        .then((res) => {
          setDBUser(res.data);
        })
        .catch((err) => setIsError(err))
        .finally(() => setIsLoading(false));
    } else {
      setIsError(true);
    }
  }, [user]);

  return {
    dbUser,
    isLoading,
    isError,
  };
};

export default useDBUser;
