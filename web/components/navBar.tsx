import Image from 'next/image';

const NavBar = ({ userName, userPicture }: any) => {
  return (
    <nav className='flex flex-row justify-between px-20 w-full bg-red-400'>
      <ul className='self-center'>
        <li className='inline mx-2 text-blue-600'>Item-1</li>
        <li className='inline mx-2 text-blue-600'>Item-2</li>
        <li className='inline mx-2 text-blue-600'>Item-3</li>
      </ul>

      <div className='flex flex-row items-center py-2'>
        <button className='mx-4'>&#43;</button>
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
