import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose';
import { json } from 'body-parser'
import { currentUserRouter } from './routes/currentuser';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';



const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter)
app.use(signUpRouter);


app.all('*', async (req, res) => {
  throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
  try {
    mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connnected to MongoDB');
  } catch (error) {
    console.log(error);  
  }

  app.listen(3000, () => {
    console.log('app is listening on port 3000!!!!!');
  })
}

start();

