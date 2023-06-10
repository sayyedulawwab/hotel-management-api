import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const dbURI: any = process.env.MONGO_URI;

class Database {
  async connect() {
    try {
      await mongoose.connect(dbURI);
      console.log('DB Connection Successful');
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Database();
