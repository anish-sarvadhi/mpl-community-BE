import express, { Express } from 'express';
import { END_POINT } from '../../constant/endpoint';
import * as authRoutes from './auth.routes';


export function initRoutes(app: Express, router: express.Router) {
  router.use(END_POINT.AUTH, authRoutes.initAuthRoutes(app, express.Router()));
  return router;
}
