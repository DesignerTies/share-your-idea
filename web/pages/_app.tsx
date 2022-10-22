import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { DBUserProvider } from '../context/DBUserContext';

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <DBUserProvider>
        <Component {...pageProps} />
      </DBUserProvider>
    </UserProvider>
  );
}

export default MyApp;
