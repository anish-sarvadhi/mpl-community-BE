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
    console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    const existingUser = await User.findOne({ user_name: 'superadmin' });

    if (!existingUser) {
      try {
        await User.create({
          first_name: 'Super',
          last_name: 'Admin',
          user_name: 'superadmin',
          email: 'superadmin@example.com',
          password: 'Superadmin@123',
        });

        console.log('✅ Superadmin user added successfully.');
      } catch (createError) {
        console.error('Error details during user creation:', createError);
        throw createError;
      }
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
