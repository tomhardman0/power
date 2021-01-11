import { Request, Response } from 'express';

import { config } from '../config';
import { COOKIE_NAMESPACE } from '../config/constants';
import axios from 'axios';

const {
  strava: { clientId, clientSecret }
} = config;

export const authRoute = async (req: Request, res: Response) => {
  const { scope, code } = req.query;
  if (!scope && !code) {
    return res.redirect(
      `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3123/auth&approval_prompt=auto&scope=activity:read_all`
    );
  }

  const authRes = await axios.post(
    `https://www.strava.com/api/v3/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`
  );
  const { refresh_token, access_token, expires_at } = authRes.data;

  return res
    .cookie(COOKIE_NAMESPACE, {
      refresh_token,
      access_token,
      expires_at
    })
    .redirect('/');
};
