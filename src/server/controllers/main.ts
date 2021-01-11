import { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import { COOKIE_NAMESPACE } from '../config/constants';
import { App } from '../../app/App';

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

    return res.send(ReactDOMServer.renderToString(App(authRes.data)));
  } else {
    return res.redirect('/auth');
  }
};
