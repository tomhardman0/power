import { Request, Response } from 'express';

import { config } from '../config';
import { COOKIE_NAMESPACE } from '../config/constants';
import axios from 'axios';

const {
  strava: { clientId, clientSecret }
} = config;

export const authRoute = async (req: Request, res: Response) => {
  const { code } = req.query;
  const authRes = await axios.post(
    `https://www.strava.com/api/v3/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`
  );
  const {
    refresh_token,
    access_token,
    expires_at,
    athlete: { username, firstname, profile }
  } = authRes.data;

  return res
    .cookie(COOKIE_NAMESPACE, {
      refresh_token,
      access_token,
      expires_at,
      user: {
        name: firstname || username,
        image: profile
      }
    })
    .redirect('/');
};
