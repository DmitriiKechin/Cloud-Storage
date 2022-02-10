import express from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import dotenv from 'dotenv';

dotenv.config();
const secretPhrase = process.env.JWT_SECRET || '';

const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token: string | undefined = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Auth error' });
    }
    const decoded: any = jwt.verify(token, secretPhrase);

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' });
  }
};

export default authMiddleware;
