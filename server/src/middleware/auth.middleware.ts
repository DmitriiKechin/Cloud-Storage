import express from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
// const config = require('config');

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
    const decoded: any = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' });
  }
};

export default authMiddleware;
