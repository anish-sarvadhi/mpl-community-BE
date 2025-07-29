import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../logger/Logger';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'mpl_community';

const connectMongoDB = async (): Promise<void> => {
  try {
    // For MongoDB Atlas URLs, we need to handle the connection string differently
    let connectionString = MONGODB_URL;
    
    // If it's a MongoDB Atlas URL (contains mongodb+srv://) and doesn't end with a slash
    if (MONGODB_URL.includes('mongodb+srv://') && !MONGODB_URL.endsWith('/')) {
      // Don't append the database name as it will be handled by Mongoose
      connectionString = MONGODB_URL;
    } 
    // For local MongoDB or if URL ends with a slash
    else if (!MONGODB_URL.endsWith('/')) {
      connectionString = `${MONGODB_URL}/${MONGODB_DB_NAME}`;
    } else {
      connectionString = `${MONGODB_URL}${MONGODB_DB_NAME}`;
    }
    
    logger.info(`Connecting to MongoDB at: ${connectionString}`);
    
    await mongoose.connect(connectionString);

    logger.info('✅ MongoDB connected successfully');
  } catch (error) {
    logger.error('❌ MongoDB connection error:', (error as Error).message);
    process.exit(1);
  }
};

export default connectMongoDB;
