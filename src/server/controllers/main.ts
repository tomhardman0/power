import { Request, Response } from 'express';
import axios from 'axios';
import { COOKIE_NAMESPACE } from '../config/constants';
import { renderApp } from '../utilities/html';
import { AppState } from '../../types/state';
import { config } from '../config';
import { stravaClient } from '../clients/strava';

const {
  strava: { clientId, clientSecret },
  baseUrl,
  maps
} = config;

export const mainRoute = async (req: Request, res: Response) => {
  const cookie = req.cookies[COOKIE_NAMESPACE];
  const state: AppState = {
    maps,
    authUrl: `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${baseUrl}/auth&approval_prompt=auto&scope=activity:read_all`
  };

  if (cookie) {
    let accessToken: string;
    const { refresh_token, access_token, expires_at, user } = cookie;
    const shouldRefresh = new Date().getTime() / 1000 >= expires_at;

    if (shouldRefresh) {
      const refreshRes = await axios.post(
        `https://www.strava.com/api/v3/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refresh_token}&grant_type=refresh_token`
      );
      const {
        refresh_token: new_refresh_token,
        access_token: new_access_token,
        expires_at: new_expires_at
      } = refreshRes.data;

      res.cookie(COOKIE_NAMESPACE, {
        refresh_token: new_refresh_token,
        access_token: new_access_token,
        expires_at: new_expires_at,
        user: user
      });

      accessToken = new_access_token;
    } else {
      accessToken = access_token;
    }

    const activities = await stravaClient.getActivities(accessToken);
    state.user = user;
    state.activities = activities;
  }

  const appHtml = renderApp(state);
  return res.send(appHtml);
};
