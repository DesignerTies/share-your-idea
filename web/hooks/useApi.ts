import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { UserContext } from '@auth0/nextjs-auth0';

const useApi = (url: string) => {
  const [data, setData] = useState<AxiosResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();
  const { user } = useContext(UserContext);

  const fetch = (url: string) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => setData(res))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    console.log(user);
    fetch(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, url]);

  return {
    data,
    isLoading,
    error,
    fetch,
  };
};

export default useApi;
