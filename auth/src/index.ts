import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined')
  }

  try {
    mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connnected to MongoDB');
  } catch (error) {
    console.log(error);
  }


  app.listen(3000, () => {
    console.log('app is listening on port 3000!!!!!');
  });
};

start();
