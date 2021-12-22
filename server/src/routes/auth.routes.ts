import * as express from 'express';
import { IUser } from '../types/models/user';
import { ILoginResponse } from '../types/response/login';
import { IRegistrationResponse } from '../types/response/registration';

const { Router } = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = new Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/auth.middleware');
const fileService = require('../services/fileService');
const File = require('../models/File');

interface IData {
  email: string;
  password: string;
}

router.post(
  '/registration',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'password must be longer than 3').isLength({ min: 3 }),
  ],
  async (req: express.Request, res: express.Response) => {
    const response: IRegistrationResponse = { message: '' };

    try {
      const errors: object = validationResult(req);

      if (Object.keys(errors).length === 0) {
        return res.status(400).json((response.message = 'Uncorrect request'));
      }
      const { email, password }: IData = req.body;

      const candidate: IUser = await User.findOne({ email });
      console.log('candidate: ', candidate);

      if (candidate) {
        response.message = `User with email ${email} already exist`;
        return res.status(400).json(response);
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashPassword });
      await user.save();
      await fileService.createDir(new File({ user: user.id, name: '' }));
      res.status(201).json((response.message = 'User was created'));
    } catch (e) {
      console.log(e);
      res.status(500).json((response.message = 'Server error'));
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
        return res.status(400).json((response.message = 'Uncorrect request'));
      }
      const { email, password }: IData = req.body;

      const user: IUser = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json((response.message = `Invalid username / password`));
      }

      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json((response.message = `Invalid username / password`));
      }

      const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), {
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
      const user: IUser = await User.findOne({ _id: req.user?.id });

      const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), {
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

module.exports = router;
