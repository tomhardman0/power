import { AppState } from '../types/state';

declare global {
  interface Window {
    __STATE__: AppState;
  }
}
