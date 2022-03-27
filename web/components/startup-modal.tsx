import axios from 'axios';
import { useState } from 'react';

const handleForm = async (
  event: any,
  userId: string,
  title: string,
  content: string,
  allStartups: any[],
  clickModal: any,
  imageId?: string
) => {
  event.preventDefault();
  axios
    .post('/api/v1/startup', {
      userId,
      title,
      content,
    })
    .then((response) => {
      allStartups.unshift(response.data);
    })
    .then(clickModal)
    .catch((error) => {
      console.log(error);
    });
};

const StartupModal = ({ clickModal, userId, allStartups }: any) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageId, setImageId] = useState<string>();

  return (
    <div className='flex items-center justify-center fixed z-1 left-0 top-0 w-full h-full overflow-auto bg-modal'>
      <div className='bg-stone-300 p-5 w-5/6 h-5/6'>
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
            handleForm(event, userId, title, content, allStartups, clickModal);
          }}
          className='m-auto mt-20 flex flex-col max-w-prose'
        >
          <input
            type='text'
            name='title'
            placeholder='Title start-up'
            className='mb-4 rounded-md focus:border-red-700 text-center'
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name='content'
            cols={30}
            rows={10}
            className='rounded-md focus:border-red-600'
            onChange={(e) => setContent(e.target.value)}
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
