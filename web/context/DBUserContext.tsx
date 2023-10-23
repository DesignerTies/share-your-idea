import { User } from '@prisma/client';
import React, { createContext, ReactElement } from 'react';
import useDBUser from '../hooks/useDBUser';

interface Props {
  children: React.ReactElement;
}

const DBUserContext = createContext<User | undefined>(undefined);

const DBUserProvider: React.FC<Props> = (props) => {
  const { dbUser, isError, isLoading } = useDBUser();
  return (
    <DBUserContext.Provider value={dbUser ? dbUser : undefined}>
      {props.children}
    </DBUserContext.Provider>
  );
};

export { DBUserProvider };

export default DBUserContext;
