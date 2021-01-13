import { Environment } from '../../types/environment';

export interface Config {
  strava: {
    clientId: string;
    clientSecret: string;
  };
  baseUrl: string;
  env: Environment;
  maps: {
    apiKey: string;
  };
}
