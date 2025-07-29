import express, { Express } from 'express';
import { END_POINT } from '../../constant/endpoint';
import * as contentRoutes from './content.routes';


export function initRoutes(app: Express, router: express.Router) {
  router.use(END_POINT.CONTENT, contentRoutes.initContentRoutes(app, express.Router()));
  return router;
}
