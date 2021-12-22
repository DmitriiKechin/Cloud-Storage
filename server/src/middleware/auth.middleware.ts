import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const config = require('config');

module.exports = (
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
