import mongoose from 'mongoose';

const connetDB = async DB_URL => {
  try {
    await mongoose.connect(DB_URL);
    console.log('DATABASE connect successfully');
  } catch (error) {
    console.log('Error to connect DB', error);
  }
};

export default connetDB;
