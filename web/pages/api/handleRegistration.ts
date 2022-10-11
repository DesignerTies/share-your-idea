import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Role } from '../../types';

const updateUser = (userId: string, userName: string) => {
  return axios
    .patch(
      `https://share-your-idea.eu.auth0.com/api/v2/users/${userId}`,
      {
        name: userName,
      },
      {
        headers: {
          authorization: 'Bearer ' + process.env.MANAGEMENT_API_TOKEN,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export default async function handleRegistration(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userName = req.body.data.userName;
  const auth0UserId = req.body.data.auth0UserId;

  try {
    const response = await updateUser(auth0UserId, userName);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=0');
    res.end(JSON.stringify(response));
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
