import axios from 'axios';
import { useState } from 'react';

interface Data {
  authorId: string;
  title: string;
  content: string;
  imageId?: string;
}

const StartupModal = ({ clickModal, userId, allStartups }: any) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (changeEvent: any) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target?.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleForm = async (
    event: any,
    data: Data,
    allStartups: any[],
    clickModal: any
  ) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const thumbImgHTML: any = Array.from(form.elements).find(
      ({ name }: any) => name === 'thumbnail-img'
    );

    if (thumbImgHTML.value) {
      console.log(thumbImgHTML.value);
      const thumbImg = new FormData();
      for (const file of thumbImgHTML.files) {
        thumbImg.append('file', file);
      }
      thumbImg.append('upload_preset', 'share-your-idea');
      // post image to cloudinary
      const imgData = await fetch(
        'https://api.cloudinary.com/v1_1/tieshoenderdos-nl/image/upload',
        {
          method: 'POST',
          body: thumbImg,
        }
      ).then((r) => r.json());

      data.imageId = imgData.secure_url;
    }

    // post Startup-Data to database
    axios
      .post('/api/v1/startup', {
        userId: data.authorId,
        title: data.title,
        content: data.content,
        imageId: data.imageId,
      })
      .then((response) => {
        allStartups.unshift(response.data);
        console.log(allStartups);
      })
      .then(clickModal)
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <div className='flex items-center justify-center fixed z-1 left-0 top-0 w-full h-full overflow-auto bg-modal'>
      <div className='bg-stone-300 p-5 w-5/6 h-5/6'>
        <span
          className='text-gray-400 float-right text-2xl font-bold hover:text-black hover:cursor-pointer focus:no-underline'
          onClick={clickModal}
        >
          &times;
        </span>
        {!isLoading && (
          <form
            method='post'
            onSubmit={(e) => {
              e.preventDefault();
              const data = {
                authorId: userId,
                title,
                content,
              };
              handleForm(event, data, allStartups, clickModal);
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
            <img src={imageSrc} alt='' />
          </form>
        )}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default StartupModal;
