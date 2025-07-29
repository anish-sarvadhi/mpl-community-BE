import express, { Express, Router } from 'express';

import * as userRoutes from './users.routes';
import * as authRoutes from './authentication';
import * as contentRoutes from './content';
import { END_POINT } from '../constant/endpoint';


export function initRoutes(app: Express): void {
  // User Routes
  app.use(END_POINT.API_BASE_USER, userRoutes.initRoutes(app, Router()));

  // Authentication Routes
  app.use(END_POINT.API_BASE, authRoutes.initRoutes(app, Router()));

  // Content Routes
  app.use(END_POINT.API_BASE, contentRoutes.initRoutes(app, Router()));

}
