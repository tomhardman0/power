import { Router } from 'express';
import { mainRoute } from './main';
import { authRoute } from './auth';

export const controllerRoutes = () => {
  const router = Router();

  router.get('/', mainRoute);
  router.get('/auth', authRoute);

  return router;
};
