import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import useUploadStartUp from '../hooks/useUploadStartUp';
import { StartUp } from '../types';

interface Data {
  authorId: string;
  title: string;
  content: string;
  imageId?: string;
}
interface Props {
  clickModal: () => void;
  userId: string;
  allStartups?: StartUp[];
}

const StartupModal: React.FC<Props> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>();
  const { handler: handleForm, isLoading } = useUploadStartUp();

  const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target?.result as string);
    };

    if (changeEvent.target.files) {
      reader.readAsDataURL(changeEvent.target.files[0]);
    }
  };

  return (
    <div className='flex items-center justify-center fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-modal'>
      <div className='bg-stone-300 p-5 w-5/6 h-5/6'>
        <span
          className='text-gray-400 float-right text-2xl font-bold hover:text-black hover:cursor-pointer focus:no-underline'
          onClick={props.clickModal}
        >
          &times;
        </span>
        {!isLoading && (
          <form
            method='post'
            onSubmit={(e) => {
              e.preventDefault();
              const data: Data = {
                authorId: props.userId,
                title,
                content,
              };
              const allStartups = props.allStartups ?? [];
              const clickModal = props.clickModal;

              handleForm(event as unknown as ChangeEvent<HTMLFormElement>, {
                data,
                allStartups,
                clickModal,
              });
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
            <input
              type='file'
              name='thumbnail-img'
              accept='image/*'
              placeholder='Upload je image'
              onChange={handleChange}
            />
            <button type='submit' className='hover:cursor-pointer'>
              Submit
            </button>
            {imageSrc && (
              <Image
                src={imageSrc}
                alt='Preview thumbnal'
                width={500}
                height={500}
              />
            )}
          </form>
        )}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default StartupModal;
