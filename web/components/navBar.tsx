const NavBar = ({ userName, userPicture }: any) => {
  return (
    <nav className='flex flex-row justify-between px-20 w-full bg-red-400'>
      <ul className='self-center'>
        <li className='inline mx-2 text-blue-600'>Item-1</li>
        <li className='inline mx-2 text-blue-600'>Item-2</li>
        <li className='inline mx-2 text-blue-600'>Item-3</li>
      </ul>

      <div className='flex flex-row items-center'>
        <button className='mx-4'>&#43;</button>
        <img
          src={userPicture!}
          alt={"Profile pic of " + userName}
          className='h-4/6 rounded-full'
        />
      </div>
    </nav>
  );
};

export default NavBar;
