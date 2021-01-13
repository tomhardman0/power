export interface AppState {
  user?: User;
  activities?: any[];
  authUrl: string;
  maps: {
    apiKey: string;
  };
}

export interface User {
  name: string;
  image: string;
}

export interface AppProps {
  state: AppState;
}
