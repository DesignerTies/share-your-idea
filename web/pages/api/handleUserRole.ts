import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const getUserRole = (userId: string) => {
  return axios
    .get(`https://share-your-idea.eu.auth0.com/api/v2/users/${userId}/roles`, {
      headers: {
        authorization: 'Bearer ' + process.env.MANAGEMENT_API_TOKEN,
      },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export default async function handleUserRole(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId;

  try {
    const response = await getUserRole(userId as string);

    res.send(response);
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
