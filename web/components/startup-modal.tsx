import axios from 'axios';

const handleForm = (userId: string) => {
  axios.post('/api/v1/startup', {}, {});
};

const StartupModal = ({ clickModal, userId }: any) => {
  return (
    <div className='flex items-center justify-center fixed z-1 left-0 top-0 w-full h-full overflow-auto'>
      <div className='bg-slate-300 p-5 border border-black border-solid w-5/6 h-5/6'>
        <span
          className='text-gray-400 float-right text-2xl font-bold hover:text-black hover:cursor-pointer focus:no-underline'
          onClick={clickModal}
        >
          &times;
        </span>
        <form
          action=''
          onSubmit={(e) => {
            e.preventDefault();
            handleForm(userId);
          }}
          className='m-auto mt-20 flex flex-col max-w-prose'
        >
          <input
            type='text'
            name='title'
            placeholder='Title start-up'
            className='mb-4 rounded-md focus:border-red-700 text-center'
          />
          <textarea
            name='content'
            cols={30}
            rows={10}
            className='rounded-md focus:border-red-600'
          ></textarea>
          <button type='submit' className='hover:cursor-pointer'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartupModal;
