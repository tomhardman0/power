import { Request, Response } from 'express';
import axios from 'axios';
import { COOKIE_NAMESPACE } from '../config/constants';

export const mainRoute = async (req: Request, res: Response) => {
  const cookie = req.cookies[COOKIE_NAMESPACE];

  if (cookie) {
    const { refresh_token, access_token, expires_at } = cookie;

    const authRes = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    return res.send(authRes.data);
  }

  const { scope, code } = req.query;
  if (!scope && !code) {
    return res.redirect('/auth');
  }

  return res.sendStatus(500);
};
