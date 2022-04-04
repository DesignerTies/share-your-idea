import Link from 'next/link';
import Image from 'next/image';

const NavBar = ({ userName, userPicture, clickAddIdea }: any) => {
  return (
    <nav className='flex flex-row justify-between px-20 w-full bg-red-400 sticky top-0 z-10'>
      <ul className='self-center'>
        <Link href='#'>
          <li className='inline mx-2 text-blue-600 hover:cursor-pointer'>
            Item-1
          </li>
        </Link>
        <Link href='#'>
          <li className='inline mx-2 text-blue-600 hover:cursor-pointer'>
            Item-2
          </li>
        </Link>
        <Link href='#'>
          <li className='inline mx-2 text-blue-600 hover:cursor-pointer'>
            Item-3
          </li>
        </Link>
      </ul>

      <div className='flex flex-row items-center py-2'>
        <button className='mx-4 hover:cursor-pointer' onClick={clickAddIdea}>
          &#43;
        </button>
        <Image
          src={userPicture!}
          height={50}
          width={50}
          alt={'Profile pic of ' + userName}
          className='rounded-full'
        />
      </div>
    </nav>
  );
};

export default NavBar;
