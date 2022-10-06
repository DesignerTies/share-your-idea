import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

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
  const userId = req.body.data.userId;

  console.log(userId);

  try {
    const response = await updateUser(userId, userName);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=0');
    res.end(JSON.stringify(response));
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
