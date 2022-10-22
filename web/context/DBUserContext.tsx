import { User } from '@prisma/client';
import React, { createContext, ReactElement } from 'react';
import useDBUser from '../hooks/useDBUser';

interface Props {
  children: React.ReactElement;
}

const DBUserContext = createContext<User | boolean>(false);

const DBUserProvider: React.FC<Props> = (props) => {
  const { dbUser, isError, isLoading } = useDBUser();
  return (
    <DBUserContext.Provider
      value={dbUser ? dbUser : isError && !dbUser ? isError : isLoading}
    >
      {props.children}
    </DBUserContext.Provider>
  );
};

export { DBUserProvider };

export default DBUserContext;
