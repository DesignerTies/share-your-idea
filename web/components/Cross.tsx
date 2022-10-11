import React from 'react';

interface Props {
  click: () => void;
}

const Cross: React.FC<Props> = (props) => {
  return (
    <span
      className='text-gray-400 float-right text-2xl font-bold hover:tesxt-black hover:cursor-pointer focus:no-underline'
      onClick={props.click}
    >
      &times;
    </span>
  );
};

export default Cross;
