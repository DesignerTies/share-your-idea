import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { StartUp } from '../types';
import SVG from './svg';

interface Props {
  startUps: StartUp[];
}

const List: React.FC<Props> = (props) => {
  return (
    // From component.html => body = div
    <div className='h-full overflow-hidden flex items-center justify-center'>
      <div className='container mx-auto bg-white p-4 lg:p-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {props.startUps.map((startup) => (
            <div
              className='overflow-hidden rounded-2xl bg-blue-50 p-4 lg:p-12'
              key={startup.id}
            >
              <div className='flex items-center text-blue-500 transition-transform duration-100 hover:scale-105'>
                <p className='text-sm font-bold uppercase '>
                  <Link href={`/feed/idea/${startup.id}`}>Naar startup</Link>
                </p>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='ml-2 h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </div>

              <h2 className='mt-4 text-3xl font-semibold text-slate-800'>
                {startup.title}
              </h2>

              <p className='mt-4 text-lg text-slate-600 whitespace-pre-line'>
                {startup.content}
              </p>

              {startup.imageId && (
                <div className='mt-12 h-[300px] w-auto flex transform items-center justify-center relative transition-transform duration-150 ease-in-out hover:scale-105'>
                  <Image
                    src={startup.imageId}
                    alt={startup.title}
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
