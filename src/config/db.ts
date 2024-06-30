// src/db.ts

import mongoose from 'mongoose';
import { config } from './config';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB Connected...');
  } catch (err:any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
