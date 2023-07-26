import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken'

import { User } from '../models/user';
import { validationRequest } from '../middlewares/validation-request';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must provide a password'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email })

    if(!existingUser){
      throw new BadRequestError('Invalid Credentials');
    }

    const passwordMatch = await Password.compare(existingUser.password, password);

    if(!passwordMatch){
      throw new BadRequestError('Invalid Credentials')
    }

    // generate JWT
    const userJWT = jwt.sign({
      id: existingUser.id,
      email: existingUser.email
    }, process.env.JWT_KEY! );

    //store it in a cookie-session

    req.session = {
      jwt: userJWT
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
