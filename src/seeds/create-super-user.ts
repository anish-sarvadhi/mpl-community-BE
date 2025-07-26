// src/seeds/create-super-user.ts

import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import connectMongoDB from '../config/mongodb';
import User from '../models/users.model';

dotenv.config();

const seedSuperAdmin = async (): Promise<void> => {
  try {
    await connectMongoDB();

    const existingUser = await User.findOne({ user_name: 'superadmin' });

    if (!existingUser) {

      await User.create({
        first_name: 'Super',
        last_name: 'Admin',
        user_name: 'superadmin',
        email: 'superadmin@example.com',
        password: 'Superadmin@123',
      });

      console.log('✅ Superadmin user added successfully.');
    } else {
      console.log('⚠️ Superadmin user already exists.');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error creating superadmin user:', (error as Error).message);
    mongoose.connection.close();
  }
};

seedSuperAdmin();
