import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import * as routes from './routes/';
import { logger } from './logger/Logger';
import { environment } from './config';
import fileUpload from 'express-fileupload'
import { errorHandlerMiddleware, responseHandling } from './middleware';
import connectMongoDB from './config/mongodb';
import User from './models/users.model';

dotenv.config();

/**
 * App Variables
 */
if (!environment.port) {
  logger.info("App Port not cofigruted. Existing...")
  process.exit(1);
}

const PORT: number = environment.port || 3000;

export class Server {

  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors({
      origin: '*'
    }));
    this.app.use(urlencoded({
      extended: true,
      limit: "500mb"
    }));
    this.app.set('trust proxy', true);
    this.app.use(express.json({ limit: '500mb' }));
    this.app.use(json())
    this.app.use(
      fileUpload({
        limits: {
          fileSize: 1000000 * 500, //500mb
          files: 10000,
        },
        abortOnLimit: true,
        responseOnLimit: 'Limit Exceed',
      })
    );
    // this.app.use(decryptData);
    // this.app.use(responseHandling);
    routes.initRoutes(this.app);
    this.app.use(errorHandlerMiddleware);

    (async () => {
      try {
        await connectMongoDB();
        this.app.listen(PORT, () => {
          logger.info(`👍 Server successfully started at port ${PORT}`);
        });
      } catch (error: any) {
        logger.error(`❌ Failed to connect to MongoDB: ${error.message}`);
        process.exit(1);
      }
    })();
  }

  getApp() {
    return this.app;
  }
}
new Server();

