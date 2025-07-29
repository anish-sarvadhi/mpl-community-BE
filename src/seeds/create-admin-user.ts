// src/seeds/create-admin-user.ts

import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import connectMongoDB from '../config/mongodb';
import User from '../models/users.model';

dotenv.config();

const seedAdmin = async (): Promise<void> => {
  try {
    await connectMongoDB();

    const existingUser = await User.findOne({ user_name: 'admin' });

    if (!existingUser) {
      console.log('⚠️ Admin user not found, creating one...');
      await User.create({
        first_name: 'Main',
        last_name: 'Admin',
        user_name: 'admin',
        email: 'admin@example.com',
        password: 'Admin@123',
      });

      console.log('✅ Admin user added successfully.');
    } else {
      console.log('⚠️ Admin user already exists.');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error creating admin user:', (error as Error).message);
    mongoose.connection.close();
  }
};

seedAdmin();
