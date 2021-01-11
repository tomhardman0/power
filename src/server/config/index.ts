import dotenv from 'dotenv';
import { Config } from '../types/config';

dotenv.config();

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, BASE_URL } = process.env;

export const config: Config = {
  strava: {
    clientId: STRAVA_CLIENT_ID || '',
    clientSecret: STRAVA_CLIENT_SECRET || ''
  },
  baseUrl: BASE_URL || ''
};
