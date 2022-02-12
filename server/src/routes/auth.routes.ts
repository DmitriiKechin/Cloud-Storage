import express from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middleware/auth.middleware';
import FileService from '../services/fileService';
import File from '../models/File';
import dotenv from 'dotenv';
import { ILoginResponse, IUser } from '../types/types';

const secretPhrase = process.env.JWT_SECRET || '';
const router = express.Router();

interface IData {
  email: string;
  password: string;
}

dotenv.config();

router.post(
  '/registration',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'password must be longer than 3').isLength({ min: 3 }),
  ],
  async (req: express.Request, res: express.Response) => {
    try {
      const errors: object = validationResult(req);

      if (Object.keys(errors).length === 0) {
        return res.status(400).json({ message:'Uncorrect request'});
      }
      const { email, password }: IData = req.body;

      const candidate: IUser | null = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: `User with email ${email} already exist`});
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashPassword });
      await user.save();
      await FileService.createDir(new File({ user: user.id, name: '' }));
      res.status(201).json({ message: 'User was created' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'password must be longer than 3').isLength({ min: 3 }),
  ],
  async (req: express.Request, res: express.Response) => {
    const response: ILoginResponse = { message: '' };

    try {
      const errors: object = validationResult(req);

      if (Object.keys(errors).length === 0) {
        return res.status(400).json({ message: 'Uncorrect request' });
      }
      const { email, password }: IData = req.body;

      const user: IUser | null = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: `Invalid username / password` });
      }

      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: `Invalid username / password` });
      }

      const token = jwt.sign({ id: user.id }, secretPhrase, {
        expiresIn: '1h',
      });

      response.token = token;
      response.user = user;
      response.message = 'success';

      res.json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json((response.message = 'Server error'));
    }
  }
);

router.get(
  '/auth',
  authMiddleware,
  async (req: express.Request, res: express.Response) => {
    const response: ILoginResponse = { message: '' };
    try {
      const user: IUser | null = await User.findOne({ _id: req.user?.id });

      if (!user) {
        return res.status(500).json({ message: 'Server error/not User' });
      }

      const token = jwt.sign({ id: user.id }, secretPhrase, {
        expiresIn: '1h',
      });

      response.token = token;
      response.user = user;
      response.message = 'success';

      res.json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
