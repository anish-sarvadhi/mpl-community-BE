import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../logger/Logger';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'mpl_community';

const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`${MONGODB_URL}/${MONGODB_DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    logger.info('✅ MongoDB connected successfully');
  } catch (error) {
    logger.error('❌ MongoDB connection error:', (error as Error).message);
    process.exit(1);
  }
};

export default connectMongoDB;
