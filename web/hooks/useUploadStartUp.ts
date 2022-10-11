import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { StartUp } from '../types';

interface Data {
  authorId: string;
  title: string;
  content: string;
  imageId?: string;
}

interface Paramaters {
  data: Data;
  allStartups: StartUp[];
  clickModal: () => void;
}

const UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/tieshoenderdos-nl/image/upload';

const useUploadStartUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handler = async (
    event: ChangeEvent<HTMLFormElement>,
    { data, allStartups, clickModal }: Paramaters
  ) => {
    event?.preventDefault();
    setIsLoading(true);

    const form = event?.target;
    const thumbImgHTML: any = Array.from(form?.elements).find(
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
      const imgData = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: thumbImg,
      }).then((r) => r.json());

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
      .catch((error: Error) => {
        console.log(error);
        setIsError(true);
      });
    setIsLoading(false);
  };
  return { handler, isLoading, isError };
};

export default useUploadStartUp;
