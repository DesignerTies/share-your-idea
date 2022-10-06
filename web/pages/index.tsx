import { useUser } from '@auth0/nextjs-auth0';

function Landing(): JSX.Element {
  const { user } = useUser();

  if (user) {
    window.location.assign('/profile');
    return <div>Handeling route...</div>;
  } else {
    return (
      <div className='flex items-center justify-center m-auto max-w-90 w-3/4 h-screen'>
        <button className='w-1/3 h-96 bg-red-400'>
          <h1 className='text-center'>Investor</h1>
        </button>
        <a href='/api/auth/login' className='w-1/3 h-96 bg-orange-300'>
          <h1 className='text-center'>Start-up</h1>
        </a>
      </div>
    );
  }
}

export default Landing;
