import dotenv from 'dotenv';
import { Environment } from '../../types/environment';
import { Config } from '../types/config';

dotenv.config();

const {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  BASE_URL,
  ENVIRONMENT,
  GOOGLE_MAPS_API_KEY
} = process.env;

export const config: Config = {
  strava: {
    clientId: STRAVA_CLIENT_ID || '',
    clientSecret: STRAVA_CLIENT_SECRET || ''
  },
  baseUrl: BASE_URL || '',
  env: (ENVIRONMENT as Environment) || Environment.DEVELOPMENT,
  maps: {
    apiKey: GOOGLE_MAPS_API_KEY || ''
  }
};
