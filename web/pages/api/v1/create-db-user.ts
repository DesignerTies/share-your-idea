import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { Role } from '@prisma/client';
import axios from 'axios';
import { UserProfile } from '@auth0/nextjs-auth0';

const getUser = async (auth0UserId: string) => {
  const auth0User = await axios.get(
    `https://share-your-idea.eu.auth0.com/api/v2/users/${auth0UserId}`,
    {
      headers: {
        Authorization: 'Bearer ' + process.env.MANAGEMENT_API_TOKEN,
      },
    }
  );
  if (auth0User.status === 200) {
    console.log(auth0User.data);
    return auth0User.data;
  } else {
    return null;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const userName = req.body.data.userName;
    const role: Role = req.body.data.role;
    const auth0UserId = req.body.data.auth0UserId;

    console.log(role);

    if (!userName && role && auth0UserId)
      res.status(406).send('wrong body given');

    const auth0User: UserProfile = await getUser(auth0UserId);

    if (!auth0User) res.status(404).send('Not found');

    try {
      const response = await prisma.user.create({
        data: {
          auth0Id: auth0UserId,
          email: auth0User.email as string,
          name: auth0User.name as string,
          username: auth0User.nickname as string,
          picture: auth0User.picture as string,
          primaryRole: role,
        },
      });
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(400).send('Something went wrong');
    }
  } else res.status(405).send('Method not allowed.');
};

export default handler;
